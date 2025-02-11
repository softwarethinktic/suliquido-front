import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link, { LinkProps } from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbNameMap: { [key: string]: string } = {
  "/home": "INICIO",
  "/home/liquidacion": "LIQUIDACIÓN DE FLETE",
  "/home/generar-estado-cuenta": "GENERAR ESTADO DE CUENTA",
  "/admin": "INICIO",
  "/admin/register-user": "REGISTRAR NUEVO USUARIO",
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MUIBreadcrumbs
      sx={{ mt: 2, width: "100%" }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography sx={{ fontSize: 12 }} key={to} color="text.primary">
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter
            sx={{ fontSize: 12 }}
            underline="hover"
            color="inherit"
            to={to}
            key={to}
          >
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </MUIBreadcrumbs>
  );
}
