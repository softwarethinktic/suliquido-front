import { FC, useCallback, useState, useEffect } from "react";
import { FletesLayout } from "../layout/FletesLayout";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  createFilterOptions,
  Divider,
  Grid2,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Download, Visibility } from "@mui/icons-material";
import { Track, useMask } from "@react-input/mask";
import { useFormik } from "formik";
import moment, { Moment } from "moment";
import * as Yup from "yup";
// import { Document, Page, pdfjs } from "react-pdf";

import { Value } from "../../interfaces/fletes.interface";
import suliquidoApi from "../../api/suliquidoApi";
import { useAuthStore } from "../../hooks/useAuthStore";
// import "./Document.css";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

const filter = createFilterOptions<Value>();
interface EstadoCuentaValues {
  placas: Value[];
  fechaInicial: Moment | null;
  fechaFinal: Moment | null;
}

const initialValues: EstadoCuentaValues = {
  placas: [],
  fechaInicial: null,
  fechaFinal: null,
};

export const GenerarEstadoCuenta: FC = () => {
  const track: Track = ({ data }) => {
    return data?.toUpperCase();
  };
  const inputRef = useMask({
    mask: "___-999",
    replacement: { _: /[a-zA-Z]/, 9: /\d/ },
    track: track,
  });

  const { user } = useAuthStore();
  const [pdf, setPdf] = useState<Blob | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const [maxDate, setMaxDate] = useState(moment());
  const [minDate, setMinDate] = useState<undefined | Moment>(undefined);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [url, setUrl] = useState<null| string>(null);

  // const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
  //   setNumPages(numPages);
  // };
  const onDownloadPdf = useCallback(() => {
    if (!pdf) return;
    const url = window.URL.createObjectURL(new Blob([pdf]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ESTADO DE CUENTA ${user?.name}.pdf`); // Filename
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [pdf]);

  const onViewPdf = useCallback(() => {
    if (!pdf) return;
    const url = URL.createObjectURL(
      new Blob([pdf], { type: "application/pdf" })
    );
    window.open(url, "_blank");
    // setUrl(url);
  }, [pdf]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      placas: Yup.array().of(
        Yup.object({
          title: Yup.string().min(
            6,
            "El título debe tener al menos 6 caracteres"
          ),
        })
      ),
      // .min(1, "Debe agregar al menos una placa"),
      fechaInicial: Yup.date().required("Debe seleccionar una fecha inicial"),
      fechaFinal: Yup.date().required("Debe seleccionar una fecha final"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const placas = values.placas.map((placa) =>
        placa.inputValue?.replace("-", "")
      );
      const fechaInicial = values.fechaInicial?.format("YYYY-MM-DD") || "";
      const fechaFinal = values.fechaFinal?.format("YYYY-MM-DD") || "";
      const queryParams = new URLSearchParams({
        placas: placas.join(","),
        fechaInicial,
        fechaFinal,
      }).toString();
      setSubmitting(true);

      try {
        const response = await suliquidoApi.get(
          `/reportes/generar-estado-cuenta/?${queryParams}`,
          { responseType: "blob" }
        );
        setPdf(response.data);
      } catch (error: any) {
        if (error.status === 404) {
          console.log(error);
          setSnackbarOpen(true);
          setSnackbarSeverity("error");
          setMessageSnackbar("No se encontraron manifiestos");
        }
      }

      setSubmitting(false);
    },
  });

  useEffect(() => {
    setPdf(null);
  }, [formik.values]);

  useEffect(() => {
    if (formik.values.fechaInicial || formik.values.fechaFinal) {
      const fechaInicial = moment(formik.values.fechaInicial);
      const fechaFinal = moment(formik.values.fechaFinal);
      setMinDate(fechaInicial);
      if (fechaFinal.isSameOrBefore(moment())) {
        setMaxDate(fechaFinal);
      } else {
        setMaxDate(moment());
      }
      if (fechaInicial.isAfter(fechaFinal)) {
        formik.setFieldValue("fechaFinal", null);
        formik.setFieldValue("fechaInicial", null);
      }
    }
  }, [formik.values.fechaInicial, formik.values.fechaFinal]);

  return (
    <FletesLayout minHeight="110vh">
      <Grid2
        gap={3}
        container
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Typography mt={3} textAlign="left" variant="body1" color={grey[600]}>
          Diligencie las fechas correspondientes para generar los informes de
          manifiesto por propietario
        </Typography>

        <form noValidate onSubmit={formik.handleSubmit}>
          <Autocomplete
            multiple
            value={formik.values.placas}
            options={[]} // Add your options here
            onChange={async (_, newValue) => {
              await formik.setFieldValue("placas", newValue);
              await formik.setFieldTouched("placas", true);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.title
              );
              if (inputValue !== "" && !isExisting) {
                if (inputValue.length < 7) return [];
                filtered.push({
                  inputValue,
                  title: `Agrega "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  {option.title}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                label="Digite los números de placa de los vehículos"
                placeholder="ABC-123"
                error={!!formik.errors.placas && (formik.touched.placas as any)}
                helperText={
                  !!formik.errors.placas && (formik.touched.placas as any)
                    ? (formik.errors.placas as string)
                    : ""
                }
              />
            )}
          />

          <DatePicker
            name="fechaInicial"
            label="FECHA INICIAL"
            value={formik.values.fechaInicial}
            maxDate={maxDate}
            slotProps={{
              field: {
                clearable: true,
              },
              textField: {
                fullWidth: true,
                name: "fechaInicial",
                margin: "normal",
                error:
                  !!formik.errors.fechaInicial && formik.touched.fechaInicial,
                helperText:
                  !!formik.errors.fechaInicial && formik.touched.fechaInicial
                    ? (formik.errors.fechaInicial as string)
                    : "",
              },
            }}
            onChange={async (value) => {
              await formik.setFieldValue("fechaInicial", value);
              await formik.setFieldTouched("fechaInicial", true);
            }}
          />

          <DatePicker
            name="fechaFinal"
            label="FECHA FINAL"
            minDate={minDate}
            maxDate={moment()}
            value={formik.values.fechaFinal}
            slotProps={{
              field: {
                clearable: true,
              },
              textField: {
                fullWidth: true,
                name: "fechaFinal",
                margin: "normal",
                error: !!formik.errors.fechaFinal && formik.touched.fechaFinal,
                helperText:
                  !!formik.errors.fechaFinal && formik.touched.fechaFinal
                    ? (formik.errors.fechaFinal as string)
                    : "",
              },
            }}
            onChange={async (value) => {
              await formik.setFieldValue("fechaFinal", value);
              await formik.setFieldTouched("fechaFinal", true);
            }}
          />

          <Button
            sx={{ mt: 2 }}
            disabled={formik.isSubmitting}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Generar Informe
          </Button>
        </form>

        <Divider orientation="horizontal" flexItem />
        {/* 
        {isLoading && <Button variant="contained">GENERAR</Button>} */}
        {formik.isSubmitting && (
          <Box
            alignItems="center"
            justifyContent="center"
            sx={{ display: "flex" }}
          >
            <CircularProgress />
          </Box>
        )}

        {pdf && (
          <>
            <Typography mt={1} textAlign="left" variant="subtitle2">
              Documento generado
            </Typography>
            <Box
              gap={1}
              justifyContent="left"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Button
                onClick={onViewPdf}
                startIcon={<Visibility />}
                variant="outlined"
              >
                VER
              </Button>
              <Button
                onClick={onDownloadPdf}
                startIcon={<Download />}
                sx={{ backgroundColor: green[500] }}
                variant="contained"
              >
                DESCARGAR
              </Button>
            </Box>
          </>
        )}

        {/* {url && (
          <Document className="document" file={url}  onLoadSuccess={onDocumentLoadSuccess}>
            <Page className="page" pageNumber={pageNumber}  />
          </Document>
        )} */}
      </Grid2>
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
    </FletesLayout>
  );
};
