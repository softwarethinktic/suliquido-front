import { FC } from "react";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export const App: FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </LocalizationProvider>
  );
};
