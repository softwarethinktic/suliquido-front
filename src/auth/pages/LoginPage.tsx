import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { FC } from "react";
import { blue, grey } from "@mui/material/colors";
import { Formik } from "formik";
import { useAuthStore } from "../../hooks/useAuthStore";
import { LoginAuthCredentials } from "../../interfaces/auth.interface";


const initialValues : LoginAuthCredentials = {
  cedula: "",
  password: "",
}

export const LoginPage: FC = () => {

  const {startLogin} = useAuthStore();

  const onSubmit = (values: LoginAuthCredentials) => {
    startLogin({uid:'', cedula: values.cedula, name:'', email:'', role:'',});
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
            onSubmit={(values: LoginAuthCredentials, { setSubmitting }) => {
              onSubmit(values);
              console.log(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 200);
            }}
          >
            {({
              values,
              // errors,
              // touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  placeholder="Ingrese su cedula"
                  label="Cedula"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="cedula"
                  value={values.cedula}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  // onClick={handleLogin}
                  sx={{ mt: 3, width: "100%" }}
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
      </Container>
    </AuthLayout>
  );
};
