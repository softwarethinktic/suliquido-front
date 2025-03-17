import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import suliquidoApi from "../../api/suliquidoApi";
import { useState } from "react";

const initialValues = {
  email: "",
};

export const ForgotPassword = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
        "success"
    );
    const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("El email es requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const { data } = await suliquidoApi.post(`/otp/send-recovery-link`, {
          email: values.email,
        });
        if (data.ok) {
          setSnackbarOpen(true);
          setSnackbarSeverity("success");
          setMessageSnackbar('Porfavor revise su correo electrónico para recuperar su contraseña');
        }
      } catch (error: any) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setMessageSnackbar(error.response.data.msg);
      }

      setSubmitting(false);
    },
  });

  return (
    <AuthLayout sx={{ justifyContent: "start" }}>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          mt={5}
        >
          <Typography variant="h4" gutterBottom>
            Recuperar contraseña
          </Typography>
          <Typography textAlign="justify" variant="body2" gutterBottom>
            Por favor, escriba su correo electrónico para recuperar su
            contraseña.
          </Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              placeholder="Ingrese su email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              error={!!formik.errors.email && formik.touched.email}
              helperText={formik.touched.email ? formik.errors.email : ""}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 1, width: "100%" }}
            >
              Enviar correo
            </Button>
          </form>
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
    </AuthLayout>
  );
};
