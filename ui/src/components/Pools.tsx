import {
  Box,
  Container,
  makeStyles,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import { useState, useCallback } from "react";
import { getTokenPairState, TokenPairState, TokenPair, bigIntToString, PairTokenDecimals } from "../utils/dex";
import { commonStyles } from "./style";

const useStyles = makeStyles(() => ({
  text: {
    fontFamily: "monospace",
    whiteSpace: "pre",
    fontSize: "15px"
  },
  list: {
    width: '100%'
  },
}));

function ListTokenPair({ tokenPair, onError }: { tokenPair: TokenPair, onError: any }) {
  const commonClasses = commonStyles()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)

  const handleClick = useCallback(() => {
    setOpen(!open)
    getTokenPairState(tokenPair.token0Info, tokenPair.token1Info)
      .then((state) => {
        setTokenPairState(state)
      })
      .catch((error) => onError(error))
  }, [onError, open, tokenPair])

  return (<>
    <ListItem key={tokenPair.tokenPairId} button onClick={handleClick}>
      <ListItemText>
        <Box className={classes.text}>{`${tokenPair.token0Info.name} -> ${tokenPair.token1Info.name}`}</Box>
      </ListItemText>
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open}>
      {tokenPairState ? (
        <>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>Token Pair Id:</p>
          <p className={commonClasses.rightAlign}>{tokenPair.tokenPairId}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{tokenPair.token0Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve0, tokenPair.token0Info.decimals)}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{tokenPair.token1Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve1, tokenPair.token1Info.decimals)}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>Total Supply:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.totalSupply, PairTokenDecimals)}</p>
        </div>
        </>
      ) : null}
    </Collapse>
  </>)
}

function Pools() {
  const commonClasses = commonStyles()
  const classes = useStyles()
  const [error, setError] = useState<string | undefined>(undefined)

  const tokenPairs: TokenPair[] = []
  const tokenLists = tokenPairs.map((tokenPair) =>
    <ListTokenPair
      key={tokenPair.tokenPairId}
      tokenPair={tokenPair}
      onError={(err: any) => setError(err)}
    />
  )

  return (
    <Container className={commonClasses.centeredContainer}>
      <div className={commonClasses.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Pools
      </Typography>
      <div className={commonClasses.spacer} />
      <Paper className={commonClasses.mainPaper}>
        <div>
          <Collapse in={true}>
            {error === undefined ? (
              <List component="nav" className={classes.list} style={{maxHeight: 500, overflow: 'auto'}}>{tokenLists}</List>
            ) : null}
            {error ? (
              <Typography variant="body2" color="error" className={commonClasses.error}>
                {error}
              </Typography>
            ) : null}
          </Collapse>
        </div>
      </Paper>
      <div className={commonClasses.spacer} />
    </Container>
  );
}

export default Pools;
