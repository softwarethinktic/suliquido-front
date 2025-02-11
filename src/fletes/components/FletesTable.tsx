import { Download, Email } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  // GridToolbar,
} from "@mui/x-data-grid";
import { BaseSyntheticEvent } from "react";
const VISIBLE_FIELDS: GridColDef[] = [
  {
    field: "rowNumber",
    headerAlign: "center",
    align: "center",
    headerName: "#",
    minWidth: 80,
    flex: 1,
    valueGetter: (_, row, __, api) =>
      `${api.current.getRowIndexRelativeToVisibleRows(row.id) + 1}`,
  },
  {
    field: "tonValue",
    headerAlign: "center",
    align: "center",
    headerName: "Vlr.TONS",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "fleteValue",
    headerAlign: "center",
    align: "center",
    headerName: "Vlr.Flete",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "anticipos",
    headerAlign: "center",
    align: "center",
    headerName: "Anticipos",
    minWidth: 130,
    flex: 1,
  },
  // { field: "year", minWidth: 130, flex: 1 },
  // { field: "cinematicUniverse", minWidth: 120, flex: 1 },
  {
    field: "action",
    align: "center",
    headerAlign: "center",
    headerName: "Acciones",
    minWidth: 150,
    sortable: false,
    flex: 1,
    disableColumnMenu: true,

    renderCell: (params: GridRenderCellParams) => {
      const onClick = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        const currentRow = params.row;
        return alert(JSON.stringify(currentRow, null, 4));
      };

      return (
        <Stack
          width="100%"
          height="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <IconButton>
            <Download />
          </IconButton>
          <IconButton>
            <Email />
          </IconButton>
          {/* <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={onClick}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={onClick}
          >
            Delete
          </Button> */}
        </Stack>
      );
    },
  },
];

function currencyFormat(num: number) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const FletesTable = () => {
  //   const data = useMovieData();
  const data = {
    rows: [
      {
        id: 1,
        tonValue: currencyFormat(10),
        fleteValue: currencyFormat(100),
        anticipos: currencyFormat(20),
      },
      {
        id: 2,
        tonValue: currencyFormat(20),
        fleteValue: currencyFormat(200),
        anticipos: currencyFormat(40),
      },
      {
        id: 3,
        tonValue: currencyFormat(30),
        fleteValue: currencyFormat(300),
        anticipos: currencyFormat(60),
      },
    ],
  };

  // Otherwise filter will be applied on fields such as the hidden column id
  //   const columns = React.useMemo(
  //     () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //     [data.columns],
  //   );

  return (
    <Box sx={{ height: "auto", width: 1 }}>
      <DataGrid
        {...data}
        isRowSelectable={() =>false}
        localeText={{
          noRowsLabel: "No se ha encontrado datos.",
          noResultsOverlayLabel: "No se ha encontrado ningún resultado",
          toolbarColumns: "Columnas",
          toolbarColumnsLabel: "Seleccionar columnas",
          toolbarFilters: "Filtros",
          toolbarFiltersLabel: "Ver filtros",
          toolbarFiltersTooltipHide: "Quitar filtros",
          toolbarFiltersTooltipShow: "Ver filtros",
          columnMenuSortAsc: "Ordenar ascendente",
          columnMenuSortDesc: "Ordenar descendente",
          columnHeaderSortIconLabel: "Ordenar",
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={VISIBLE_FIELDS}
        // slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};

export default FletesTable;
