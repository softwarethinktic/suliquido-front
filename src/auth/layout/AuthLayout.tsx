import { Grid2, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ElementType, ReactNode } from "react";
import "../styles/index.css";

interface Props {
  children: ReactNode;
  title?: string;
}

export const AuthLayout = ({ children, title = "" }: Props) => {
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
          width: { sm: 450, xs: "100%" },
          height: {xs: '100vh', sm: 'auto'},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
          <img
            className="logo"
            src="https://suliquido.thinktic.co/wp-content/uploads/2024/01/logo-SU-LIQUIDO-SAS-1-e1708029386257.png"
            alt=""
          ></img>
        </Typography>
        {children}
        {/* </> */}
      </Grid2>
    </Grid2>
  );
};
