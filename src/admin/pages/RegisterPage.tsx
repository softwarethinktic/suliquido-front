import { Button, Container, Box, TextField, Typography } from "@mui/material";
import { FC } from "react";
// import { blue, grey } from "@mui/material/colors";
import { Formik } from "formik";
import { FletesLayout } from "../../fletes/layout/FletesLayout";

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

export const RegisterPage: FC = () => {
  const onSubmit = (values: RegisterFormValues) => {
    console.log(values);
    // Add your form submission logic here
  };

  return (
    <FletesLayout>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Registrar Nuevo Usuario
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
              setTimeout(() => {
                setSubmitting(false);
              }, 200);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  placeholder="Ingrese el número de documento"
                  label="Número de Documento"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="documentNumber"
                  value={values.documentNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.documentNumber && Boolean(errors.documentNumber)
                  }
                  helperText={touched.documentNumber && errors.documentNumber}
                />
                <TextField
                  placeholder="Ingrese el email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  placeholder="Ingrese la contraseña"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  placeholder="Ingrese el nombre"
                  label="Nombre"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, width: "100%" }}
                >
                  Registrar
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </FletesLayout>
  );
};
