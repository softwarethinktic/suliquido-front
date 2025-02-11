import { FC, useState } from "react";
import { FletesLayout } from "../layout/FletesLayout";
import {
  Autocomplete,
  Box,
  Button,
  createFilterOptions,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Download, Visibility } from "@mui/icons-material";
import { Value } from "../../interfaces/fletes.interface";

const filter = createFilterOptions<Value>();



export const GenerarEstadoCuenta: FC = () => {
  const [value, setValue] = useState<Value[]>([]);
  const isLoading = true;

  return (
    <FletesLayout>
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

        <form>
          <Autocomplete
            multiple
            value={value}
            options={[]}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.title
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
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
                error
                helperText="Seleccione un propietario"
                {...params}
                label="xd"
                placeholder="XXX-XXX"
              />
            )}
          />

          <DatePicker sx={{ width: "100%" }} label="FECHA INICIAL" />
          <DatePicker sx={{ width: "100%" }} label="FECHA FINAL" />
        </form>
        <Divider orientation="horizontal" flexItem />

        {isLoading && <Button variant="contained">GENERAR</Button>}

        <Typography mt={3} textAlign="left" variant="subtitle2">
          Documento generado
        </Typography>
        <Box
          gap={1}
          justifyContent="left"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Button startIcon={<Visibility />} variant="outlined">
            VER
          </Button>
          <Button
            startIcon={<Download />}
            sx={{ backgroundColor: green[500] }}
            variant="contained"
          >
            DESCARGAR
          </Button>
        </Box>
      </Grid2>
    </FletesLayout>
  );
};
