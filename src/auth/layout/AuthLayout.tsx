import { Grid2 } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ElementType, ReactNode, useCallback } from "react";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  
  const navigate = useNavigate();
  

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, []);
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: grey[100], padding: {sm: 4,xs: 0} }}
    >
      <Grid2
        component={"div" as ElementType}
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: '50vw', xs: "100%" },
          height: {xs: '100vh', sm: '70vh'},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
          <img
            onClick={goToLogin}
            className="logo"
            src="https://suliquido.thinktic.co/wp-content/uploads/2024/01/logo-SU-LIQUIDO-SAS-1-e1708029386257.png"
            alt=""
          ></img>
        {children}
        {/* </> */}
      </Grid2>
    </Grid2>
  );
};
