import { FC } from "react";
import { FletesLayout } from "../../fletes/layout/FletesLayout";
import { Box, Button, ButtonProps, styled, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[50]),
  borderColor: grey[200],
  backgroundColor: grey[50],
  "&:hover": {
    backgroundColor: grey[100],
  },
  padding: theme.spacing(1.5),
}));

export const AdminPage: FC = () => {
  const navigate = useNavigate();

  const goToRegisterUser = useCallback(() => {
    navigate("./register-user");
  }, []);

//   const goToUserList = useCallback(() => {
//     navigate("/user-list");
//   }, []);

  return (
    <FletesLayout>
      <Box
        width="100%"
        height="100%"
        justifyContent="flex-start"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h6" gutterBottom>
          Bienvenido, <strong>Admin</strong>
        </Typography>
        <Typography variant="body1" gutterBottom color={grey[600]}>
          ¿Qué desea hacer hoy?
        </Typography>
        <ButtonStyled
          onClick={goToRegisterUser}
          sx={{
            mt: 3,
          }}
          variant="outlined"
          startIcon={<PersonAdd color="primary" />}
          fullWidth
        >
          REGISTRAR NUEVO USUARIO
        </ButtonStyled>
        {/* <ButtonStyled
          sx={{
            mt: 3,
          }}
          onClick={goToUserList}
          variant="outlined"
          startIcon={<ListAlt color="primary" />}
          fullWidth
        >
          VER LISTA DE USUARIOS
        </ButtonStyled> */}
      </Box>
    </FletesLayout>
  );
};
