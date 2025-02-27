import { Box, Button, ButtonProps, styled, Typography } from "@mui/material";
import { LocalShippingOutlined, Description } from "@mui/icons-material";
import { FletesLayout } from "../layout/FletesLayout";
import "../styles/index.css";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[50]),
  borderColor: grey[200],
  backgroundColor: grey[50],
  "&:hover": {
    backgroundColor: grey[100],
  },
  padding: theme.spacing(1.5),
}));

export const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const goToLiquidacion = useCallback(() => {
    navigate("/home/liquidacion");
  }, []);

  const goToGenerarEstadoCuenta = useCallback(() => {
    navigate("/home/generar-estado-cuenta");
  }, []);
  return (
    <FletesLayout>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        sx={{
          height: {
            sm: "100%",
            xs: "70%",
          },
          marginBottom: {
            xs: "20%",
          },
        }}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>
          Cordial saludo, <strong>{user?.name.split(" ")[0]}</strong>
        </Typography>
        <Typography variant="body1" gutterBottom color={grey[600]}>
          ¿Qué desea hacer hoy?
        </Typography>
        <ButtonStyled
          onClick={goToLiquidacion}
          sx={{
            mt: 3,
          }}
          variant="outlined"
          startIcon={<LocalShippingOutlined color="primary" />}
          fullWidth
        >
          LIQUIDACIÓN DE FLETE
        </ButtonStyled>
        <ButtonStyled
          sx={{
            mt: 3,
          }}
          onClick={goToGenerarEstadoCuenta}
          variant="outlined"
          startIcon={<Description color="primary" />}
          fullWidth
        >
          GENERAR ESTADO DE CUENTA
        </ButtonStyled>
      </Box>
    </FletesLayout>
  );
};
