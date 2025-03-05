import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { FC, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FletesLayout } from "../../fletes/layout/FletesLayout";
import suliquidoApi from "../../api/suliquidoApi";

interface RegisterFormValues {
  documentNumber: string;
  email: string;
  password: string;
  name: string;
}

const initialValues: RegisterFormValues = {
  documentNumber: "",
  email: "",
  password: "",
  name: "",
};

const validationSchema = Yup.object({
  documentNumber: Yup.string().required("El número de documento es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  name: Yup.string().required("El nombre es requerido").trim(),
});

export const RegisterPage: FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await suliquidoApi.post("/auth/register", values);
      if (response.data.ok) {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setMessageSnackbar("El usuario ha sido registrado exitosamente");
      }
    } catch (error: any) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setMessageSnackbar(error.response.data.msg);
    }
  };

  return (
    <FletesLayout minHeight="115vh">
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Registrar Nuevo Usuario
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await onSubmit(values);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  placeholder="Ingrese su número de documento"
                  label="Número de Documento"
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
                  placeholder="Ingrese su email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  error={!!errors.email && touched.email}
                  helperText={touched.email ? errors.email : ""}
                  value={values.email}
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
                  error={!!errors.password && touched.password}
                  helperText={touched.password ? errors.password : ""}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  placeholder="Ingrese su nombre"
                  label="Nombre"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="name"
                  error={!!errors.name && touched.name}
                  helperText={touched.name ? errors.name : ""}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 1, width: "100%" }}
                >
                  Registrar
                </Button>
              </form>
            )}
          </Formik>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {messageSnackbar}
          </Alert>
        </Snackbar>
      </Container>
    </FletesLayout>
  );
};
