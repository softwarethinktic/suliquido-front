import { AccountCircle, LogoutOutlined } from "@mui/icons-material";
import { Box, Divider, Grid2, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ElementType, ReactNode, useCallback } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const FletesLayout = ({ children }: Props) => {

  const navigate = useNavigate();


  const goToHome = useCallback(() => {
    
    navigate("/");
  }, []);


  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      bgcolor={grey[100]}
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        width: { sm: "auto", xs: "100vw" },
        paddingLeft: { sm: 4, xs: 0 },
        paddingRight: { sm: 4, xs: 0 },
        paddingBottom: { sm: 4, xs: 0 },
      }}
    >
      <Grid2
        component={"div" as ElementType}
        xs={3}
        sx={{
          width: { sm: "auto", xs: "100%" },
          minHeight: { sm: "auto", xs: "100vh" },
          boxShadow: { sm: "0px 5px 5px rgba(0, 0, 0, 0.2)", xs: "none" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid2
          container
          spacing={0}
          width={"100%"}
          paddingBottom={3}
          direction="row"
          justifyContent="space-between"
        >
          <img
            src="https://suliquido.thinktic.co/wp-content/uploads/2024/01/logo-SU-LIQUIDO-SAS-1-e1708029386257.png"
            width="150"
            alt=""
            onClick={goToHome}
            style={{ cursor: 'pointer' }}
          />

          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton>
              <AccountCircle />
            </IconButton>
            <Typography sx={{ marginBottom: 0 }} variant="body2" gutterBottom>
              Usuario
            </Typography>
            <IconButton /*onClick={onLogOut}*/ color="error">
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Grid2>
        <Divider orientation="horizontal" flexItem />

        <Breadcrumbs />

        {children}
      </Grid2>
    </Grid2>
  );
};
