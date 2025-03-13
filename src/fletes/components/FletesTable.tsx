import { Download, Email } from "@mui/icons-material";
import { Alert, IconButton, Snackbar, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import { Manifiesto, ManifiestoPaged } from "../../interfaces/fletes.interface";
import suliquidoApi from "../../api/suliquidoApi";
import { useGetFletesQuery } from "../../api/fletesApi";

function currencyFormat(num: number) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

interface FletesTableProps {
  data: ManifiestoPaged | null;
  isUninitialized: boolean;
  isFetching: boolean;
  fletesValues: {
    numeroManifiesto: string;
    placa: string;
    fecha: string;
    productName: string;
  };
}

const FletesTable = (props: FletesTableProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [messageSnackbar, setMessageSnackbar] = useState<string | null>(null);

  const VISIBLE_FIELDS: GridColDef[] = useMemo(
    () => [
      {
        field: "valorTons",
        headerAlign: "center",
        align: "center",
        headerName: "Vlr.TONS",
        minWidth: 150,
        valueFormatter: (params) => currencyFormat(params as number),
        flex: 1,
      },
      {
        field: "valorFlete",
        headerAlign: "center",
        align: "center",
        headerName: "Vlr.Flete",
        valueFormatter: (params) => currencyFormat(params as number),
        minWidth: 140,
        flex: 1,
      },
      {
        field: "anticipos",
        headerAlign: "center",
        align: "center",
        headerName: "Anticipos",
        valueFormatter: (params) => currencyFormat(params as number),
        minWidth: 130,
        flex: 1,
      },
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
          const onDownloadPDF = (e: BaseSyntheticEvent) => {
            e.stopPropagation();
            const currentRow = params.row as Manifiesto;
            suliquidoApi
              .get(`/reportes/generar-liquidacion/${currentRow.id}`, {
                responseType: "blob",
              })
              .then((response) => {
                const url = window.URL.createObjectURL(
                  new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                  "download",
                  `LIQUIDACION MF ${currentRow.numeroManifiesto.slice(3)}.pdf`
                ); // Filename
                document.body.appendChild(link);
                link.click();
                link.remove();
              });
          };
          const onSendPDF = async (e: BaseSyntheticEvent) => {
            e.stopPropagation();
            const currentRow = params.row as Manifiesto;

            try {
              const response = await suliquidoApi.get(
                `/reportes/enviar-liquidacion/${currentRow.id}`
              );
              if (response.data.ok) {
                setSnackbarOpen(true);
                setSnackbarSeverity("success");
                setMessageSnackbar(response.data.msg);
              }
            } catch (error: any) {
              setSnackbarOpen(true);
              setSnackbarSeverity("error");
              setMessageSnackbar(error.response.data.msg);
            }
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
              <IconButton onClick={onDownloadPDF}>
                <Download />
              </IconButton>
              <IconButton onClick={onSendPDF}>
                <Email />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    []
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [pageState, setPageState] = useState({
    data: props.data?.manifiestos || [],
    total: props.data?.totalItems || 0,
    page: props.data?.currentPage || 0,
    totalPages: props.data?.totalPages || 0,
    pageSize: props.data?.pageSize || 5,
  });

  const { isFetching, data } = useGetFletesQuery(
    {
      ...props.fletesValues,
      page: pageState.page,
      size: pageState.pageSize,
    },
    {
      skip: props.isUninitialized,
    }
  );

  useEffect(() => {
    if (!data) return;
    setPageState({
      ...pageState,
      data: data.response?.manifiestos || [],
      total: data.response?.totalItems || 0,
      page: data.response?.currentPage || 0,
      totalPages: data.response?.totalPages || 0,
    });
  }, [data]);

  useEffect(() => {
    setPageState({
      ...pageState,
      data: props.data?.manifiestos || [],
      total: props.data?.totalItems || 0,
      page: props.data?.currentPage || 0,
      totalPages: props.data?.totalPages || 0,
      pageSize: props.data?.pageSize || 5,
    });
  }, [props.data]);

  return (
    <Box sx={{ height: "auto", width: 1 }}>
      <DataGrid
        rows={pageState.data}
        rowCount={pageState.total}
        loading={props.isFetching || isFetching}
        pagination
        pageSizeOptions={[5, 10, 15]} // Set the available page size options
        paginationModel={{
          pageSize: pageState.pageSize,
          page: pageState.page,
        }}
        paginationMode="server"
        onPaginationModelChange={(values) => {
          // trigger();
          setPageState({ ...pageState, ...values });
        }}
        isRowSelectable={() => false}
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
    </Box>
  );
};

export default FletesTable;
