import { FC } from "react";
import { FletesLayout } from "../layout/FletesLayout";
import FletesTable from "../components/FletesTable";
import { Autocomplete, Grid2, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const options = [
  { label: "The Shawshank Redemption", id: 1994 },
  { label: "The Godfather", id: 1972 },
  { label: "The Godfather: Part II", id: 1974 },
  { label: "The Dark Knight", id: 2008 },
];

export const LiquidacionFlete: FC = () => {
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
          Diligencie la siguiente información para generar la liquidación
        </Typography>
        <TextField label="NÚMERO MANIFIESTO" placeholder="Digite el número del manifiesto" />
        <Autocomplete
          fullWidth
          disablePortal
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="PLACA"
              placeholder="Seleccione una placa"
            />
          )}
        />
        
        <DatePicker sx={{ width: "100%" }} label="FECHA" />

        <Autocomplete
          fullWidth
          disablePortal
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="PRODUCTO"
              placeholder="Seleccione un producto"
            />
          )}
        />
        <FletesTable />
      </Grid2>
    </FletesLayout>
  );
};
