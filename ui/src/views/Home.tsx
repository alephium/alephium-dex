import { makeStyles, AppBar, Toolbar, Link, Hidden } from "@material-ui/core";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { COLORS } from "../muiTheme";
import { network } from "../utils/consts";
import { web3 } from "@alephium/web3";
import Swap from "../components/Swap";
import AddLiquidity from "../components/AddLiquidity";
import RemoveLiquidity from "../components/RemoveLiquidity";
import useGetDexTokens from "../hooks/useGetDexTokens";
import AddPool from "../components/AddPool";
import Pools from "../components/Pools";
import { AlephiumConnectButton } from "@alephium/web3-react";
import TransactionSettings from "../components/Settings";
import { useDispatch } from "react-redux"
import { reset as resetSwapState } from "../state/swap/actions";
import { reset as resetMintState } from "../state/mint/actions";

const useStyles = makeStyles((theme) => ({
  spacer: {
    height: "1rem",
  },
  appBar: {
    background: COLORS.nearBlackWithMinorTransparency,
    "& > .MuiToolbar-root": {
      margin: ".5rem 0rem 0rem 1rem",
      width: "100%",
    },
  },
  link: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
    },
    "&.active": {
      color: theme.palette.primary.light,
    },
  },
  bg: {
    background:
      "linear-gradient(160deg, rgba(69,74,117,.1) 0%, rgba(138,146,178,.1) 33%, rgba(69,74,117,.1) 66%, rgba(98,104,143,.1) 100%), linear-gradient(45deg, rgba(153,69,255,.1) 0%, rgba(121,98,231,.1) 20%, rgba(0,209,140,.1) 100%)",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

function Home() {
  const classes = useStyles();
  web3.setCurrentNodeProvider(network.nodeHost)
  const { dexTokens } = useGetDexTokens(network.factoryId)
  const dispatch = useDispatch()

  return (
    <div className={classes.bg}>
      <AppBar
        position="static"
        color="inherit"
        className={classes.appBar}
        elevation={0}
      >
        <Toolbar>
          <div className={classes.spacer} />
          <Hidden implementation="css" xsDown>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                component={NavLink}
                to="/swap"
                color="inherit"
                className={classes.link}
                onClick={() => { dispatch(resetSwapState()) }}
              >
                Swap
              </Link>
              <Link
                component={NavLink}
                to="/add-liquidity"
                color="inherit"
                className={classes.link}
                onClick={() => { dispatch(resetMintState()) }}
              >
                Add Liquidity
              </Link>
              <Link
                component={NavLink}
                to="/remove-liquidity"
                color="inherit"
                className={classes.link}
              >
                Remove Liquidity
              </Link>
              <Link
                component={NavLink}
                to="/add-pool"
                color="inherit"
                className={classes.link}
              >
                Add Pool
              </Link>
              <Link
                component={NavLink}
                to="/pools"
                color="inherit"
                className={classes.link}
              >
                Pools
              </Link>
            </div>
          </Hidden>
          <div style={{ position: "absolute", top: "6px", right: "30px" }}>
            <TransactionSettings />
          </div>
          <div style={{ position: "absolute", top: "10px", right: "80px" }}>
            <AlephiumConnectButton />
          </div>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/swap">
          <Swap dexTokens={dexTokens} />
        </Route>
        <Route exact path="/add-liquidity">
          <AddLiquidity dexTokens={dexTokens} />
        </Route>
        <Route exact path="/remove-liquidity">
          <RemoveLiquidity dexTokens={dexTokens} />
        </Route>
        <Route exact path="/add-pool">
          <AddPool />
        </Route>
        <Route exact path="/pools">
          <Pools dexTokens={dexTokens} />
        </Route>
        <Route>
          <Redirect to="/swap" />
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
