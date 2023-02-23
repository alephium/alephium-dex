import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { theme } from "./muiTheme";
import { AlephiumConnectProvider } from "@alephium/web3-react"

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AlephiumConnectProvider>
          <SnackbarProvider maxSnack={3}>
            <HashRouter>
              <App />
            </HashRouter>
          </SnackbarProvider>
        </AlephiumConnectProvider>
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);
