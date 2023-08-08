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
import { AlephiumWalletProvider } from "@alephium/web3-react"
import { network, networkId } from "./utils/consts";

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <AlephiumWalletProvider addressGroup={network.groupIndex} network={networkId}>
            <SnackbarProvider maxSnack={3}>
              <HashRouter>
                <App />
              </HashRouter>
            </SnackbarProvider>
          </AlephiumWalletProvider>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
