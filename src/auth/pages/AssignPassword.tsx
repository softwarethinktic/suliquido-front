import { useEffect, useState, useCallback } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { Box, Container, Typography } from "@mui/material";
import suliquidoApi from "../../api/suliquidoApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { CheckingAuth } from "../components/CheckingAuth";

export const AssignPassword = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);

  const [isOTPValid, setisOTPValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const otpCode = searchParams.getAll("otp")[0];
    if (!otpCode) {
      setisOTPValid(false);
      return;
    }
    checkOTPcode(otpCode);
  }, [searchParams]);

  const checkOTPcode = useCallback(async (otp: string) => {
    setIsLoading(true);
    try {
      const { data } = await suliquidoApi.get(`/otp/validate-otp-password`, {
        headers: {
          "otp-code": otp,
        },
      });
      if (data.ok) {
        setisOTPValid(true);
      } else {
        setisOTPValid(false);
      }
    } catch (error: any) {
      setisOTPValid(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("La confirmación de la contraseña es requerida"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const otpCode = searchParams.getAll("otp")[0];
      setIsLoading(true);
      try {
        const { data } = await suliquidoApi.post(
          `/auth/assign-password`,
          {
            password: values.password,
          },
          {
            headers: {
              "otp-code": otpCode,
            },
          }
        );
        if (data.ok) {
          setSnackbarSeverity("success");
          setMessageSnackbar(data.msg);
          setSnackbarOpen(true);
          resetForm();
          navigate("/login");
        } else {
          setSnackbarSeverity("error");
          setMessageSnackbar(data.msg);
          setSnackbarOpen(true);
        }
      } catch (error: any) {
        setSnackbarSeverity("error");
        setMessageSnackbar(error.response.data.msg);
        setSnackbarOpen(true);
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  if (isLoading) return <CheckingAuth />;

  if (!isOTPValid) {
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
  } else {
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
            <Typography textAlign="center" variant="h4" gutterBottom>
              Asignar contraseña
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Contraseña nueva"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar contraseña nueva"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                margin="normal"
              />
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={formik.isSubmitting}
                sx={{ mt: 2 }}
              >
                Asignar contraseña
              </Button>
            </form>
          </Box>
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {messageSnackbar}
          </Alert>
        </Snackbar>
      </AuthLayout>
    );
  }
};
