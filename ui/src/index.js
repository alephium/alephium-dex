import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { theme } from "./muiTheme";
import { store } from "./state"
import { Provider } from "react-redux"
import { AlephiumConnectProvider } from "@alephium/web3-react"

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AlephiumConnectProvider chainGroup={0} network="testnet">
            <SnackbarProvider maxSnack={3}>
              <HashRouter>
                <App />
              </HashRouter>
            </SnackbarProvider>
          </AlephiumConnectProvider>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
