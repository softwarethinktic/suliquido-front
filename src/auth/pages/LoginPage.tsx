import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
  SnackbarCloseReason,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { FC, useMemo } from "react";
import { blue, grey } from "@mui/material/colors";
import { Formik } from "formik";
import { useAuthStore } from "../../hooks/useAuthStore";
import { LoginAuthCredentials } from "../../interfaces/auth.interface";

const initialValues: LoginAuthCredentials = {
  documentNumber: "",
  password: "",
};

export const LoginPage: FC = () => {
  const { startLogin, startClearErrorMessages, status, errorMessage } =
    useAuthStore();

  const onSubmit = (values: LoginAuthCredentials) => {
    startLogin(values);
  };

  const isChecking = useMemo(() => status === "checking", [status]);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    startClearErrorMessages();
  };

  return (
    <AuthLayout>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          {/* 
           //* Formik is the responsible for handling the form state and validation.
           */}
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<LoginAuthCredentials> = {};
              if (!values.documentNumber) {
                errors.documentNumber = "Campo requerido";
              }
              if (!values.password) {
                errors.password = "Campo requerido";
              }
              return errors;
            }}
            onSubmit={(values: LoginAuthCredentials) => {
              onSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              /* and other goodies */
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  placeholder="Ingrese su cedula"
                  label="Cedula"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="documentNumber"
                  error={!!errors.documentNumber && touched.documentNumber}
                  helperText={
                    touched.documentNumber ? errors.documentNumber : ""
                  }
                  value={values.documentNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  placeholder="Ingrese su contraseña"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  value={values.password}
                  error={!!errors.password && touched.password}
                  helperText={touched.password ? errors.password : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Button
                  type="submit"
                  disabled={isChecking}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 1, width: "100%" }}
                >
                  Ingresar al sistema
                </Button>
              </form>
            )}
          </Formik>
          <Typography
            sx={{
              my: 5,
              fontWeight: "bold",
              cursor: "pointer",
              color: blue[500],
              ":hover": { color: blue[800] },
              userSelect: "none",
            }}
            variant="body1"
            gutterBottom
          >
            ¿Olvidó su contraseña?
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="center">
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", color: grey[600] }}
          >
            Sistema de autogestión documental para propietarios de vehículos |
            v1.0
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block", color: grey[600] }}
          >
            2025 - Todos los derechos reservados - SULIQUIDO SLQ SAS
          </Typography>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!errorMessage}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </AuthLayout>
  );
};
