import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import { CheckingAuth } from "../components/CheckingAuth";
import { AuthLayout } from "../layout/AuthLayout";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface RegisterFormValues {
  name: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: RegisterFormValues = {
  name: "",
  password: "",
  passwordConfirmation: "",
};
export default function RegisterPage() {
  const [searchParams, _] = useSearchParams();
  const {
    checkOTPcode,
    isOTPvalid,
    startClearErrorMessages,
    errorMessage,
    isLoading,
    startRegister,
  } = useAuthStore();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es requerido").trim(),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("La confirmación de la contraseña es requerida"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const otpCode = searchParams.getAll("otp")[0];
      setSubmitting(true);
      startRegister({ name: values.name, password: values.password, otpCode });
      setSubmitting(false);
    },
  });

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    startClearErrorMessages();
  };

  useEffect(() => {
    const otpCode = searchParams.getAll("otp")[0];
    checkOTPcode(otpCode);
  }, [searchParams]);

  if (isLoading) {
    return <CheckingAuth />;
  }

  if (isOTPvalid) {
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
              Registrar nuevo usuario
            </Typography>

            <Typography textAlign="justify" variant="body2" gutterBottom>
              Por favor, complete el siguiente formulario para registrar su
              nuevo usuario. Asegúrese de ingresar toda la información requerida
              correctamente.
            </Typography>
            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                placeholder="Ingrese su nombre"
                label="Nombre"
                variant="outlined"
                margin="normal"
                fullWidth
                name="name"
                error={!!formik.errors.name && formik.touched.name}
                helperText={formik.touched.name ? formik.errors.name : ""}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                placeholder="Ingrese su contraseña"
                label="Contraseña"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                error={!!formik.errors.password && formik.touched.password}
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                placeholder="Confirme su contraseña"
                label="Confirmar contraseña"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                name="passwordConfirmation"
                error={
                  !!formik.errors.passwordConfirmation &&
                  formik.touched.passwordConfirmation
                }
                helperText={
                  formik.touched.passwordConfirmation
                    ? formik.errors.passwordConfirmation
                    : ""
                }
                value={formik.values.passwordConfirmation}
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
                Registrar
              </Button>
            </form>
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
  } else {
    return (
      <AuthLayout>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            mt={5}
          >
            <Typography variant="h4" gutterBottom>
              Código OTP inválido
            </Typography>

            <Typography textAlign="justify" variant="body2" gutterBottom>
              El código OTP que ingresó es inválido. Por favor, verifique que el
              código sea correcto y vuelva a intentarlo.
            </Typography>
          </Box>
        </Container>
      </AuthLayout>
    );
  }
}
