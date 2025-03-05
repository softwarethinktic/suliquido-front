import { FC, useMemo, useState } from "react";
import { FletesLayout } from "../layout/FletesLayout";
import FletesTable from "../components/FletesTable";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Track, useMask } from "@react-input/mask";
import { Formik } from "formik";
import { useGetFletesQuery } from "../../api/fletesApi";
import { Moment } from "moment";
import { FleteValues } from "../../interfaces/fletes.interface";

const initialValues: FleteValues = {
  numeroManifiesto: "",
  placa: "",
  fecha: null as Moment | null,
  productName: "",
};

export const LiquidacionFlete: FC = () => {
  const track: Track = ({ data }) => {
    return data?.toUpperCase();
  };

  const [values, setValues] = useState<FleteValues>(initialValues);

  const nroManifiestoRef = useMask({
    mask: "___-________",
    replacement: { _: /\d/ },
  });

  const placaRef = useMask({
    mask: "___-999",
    replacement: { _: /[a-zA-Z]/, 9: /\d/ },
    track: track,
  });

  const handleSubmit = (values: FleteValues) => {
    setValues(values);
  };

  const isFormEmpty = useMemo(() => {
    return (
      !values.numeroManifiesto.length &&
      !values.placa.length &&
      !values?.fecha &&
      !values.productName.length
    );
  }, [values]);

  const { data, isFetching, isUninitialized } = useGetFletesQuery(
    {
      numeroManifiesto: values.numeroManifiesto.replace("-", ""),
      placa: values.placa.replace("-", ""),
      fecha: values.fecha?.format("YYYY-MM-DD") || ("" as string),
      productName: values.productName,
      page: 0,
      size: 5,
    },
    {
      skip: isFormEmpty,
    }
  );

  return (
    <FletesLayout minHeight="140vh">
      <Grid2
        gap={3}
        container
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            if (
              !values.numeroManifiesto.length &&
              !values.placa.length &&
              !values?.fecha &&
              !values.productName.length
            ) {
              setSubmitting(true);
              setStatus("empty");
              return;
            }
            setSubmitting(true);
            handleSubmit(values);
          }}
          validate={(values) => {
            const errors: Partial<FleteValues> = {};
            if (
              values.numeroManifiesto.length !== 12 &&
              values.numeroManifiesto
            ) {
              errors.numeroManifiesto = "Campo inválido";
            }
            if (values.placa.length !== 7 && values.placa) {
              errors.placa = "Campo inválido";
            }
            return errors;
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setSubmitting,
            setStatus,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                margin="normal"
                name="numeroManifiesto"
                placeholder="Ingrese el número del manifiesto"
                label="NÚMERO MANIFIESTO"
                value={values.numeroManifiesto}
                onChange={(value) => {
                  setSubmitting(false);
                  setStatus("not-empty");
                  handleChange(value);
                }}
                onBlur={handleBlur}
                inputRef={nroManifiestoRef}
                error={!!errors.numeroManifiesto && touched.numeroManifiesto}
                helperText={
                  touched.numeroManifiesto ? errors.numeroManifiesto : ""
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="placa"
                placeholder="Ingrese el número de la placa"
                label="PLACA"
                // helperText="ABC-123"
                value={values.placa}
                onChange={(value) => {
                  setSubmitting(false);
                  setStatus("not-empty");
                  handleChange(value);
                }}
                onBlur={handleBlur}
                inputRef={placaRef}
                error={!!errors.placa && touched.placa}
                helperText={touched.placa ? errors.placa : ""}
              />
              <DatePicker
                name="fecha"
                label="FECHA"
                value={values.fecha}
                slotProps={{
                  actionBar: {
                    actions: ["clear", "cancel", "accept"],
                  },
                  field: {
                    clearable: true,
                  },
                  textField: {
                    fullWidth: true,
                    name: "fecha",
                    margin: "normal",
                  },
                }}
                onChange={(value) => {
                  setSubmitting(false);
                  setStatus("not-empty");
                  setFieldValue("fecha", value);
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="productName"
                placeholder="Ingrese el nombre del producto"
                label="PRODUCTO"
                value={values.productName}
                onChange={(value) => {
                  setSubmitting(false);
                  setStatus("not-empty");
                  handleChange(value);
                }}
                onBlur={handleBlur}
                // error={!!errors.productName && touched.productName}
                // helperText={touched.productName ? errors.productName : ""}
              />

              {isSubmitting && status === "empty" && (
                <Typography variant="caption" color="error">
                  Debe ingresar al menos un campo para realizar la búsqueda
                </Typography>
              )}

              <Button
                disabled={isFetching}
                sx={{ mt: 2 }}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Generar Liquidación
              </Button>
            </form>
          )}
        </Formik>
        <FletesTable
          fletesValues={{
            numeroManifiesto: values.numeroManifiesto.replace("-", ""),
            placa: values.placa.replace("-", ""),
            fecha: values.fecha?.format("YYYY-MM-DD") || "",
            productName: values.productName,
          }}
          data={data?.response ? data.response : null}
          isUninitialized={isUninitialized}
          isFetching={isFetching}
        />
      </Grid2>
    </FletesLayout>
  );
};
