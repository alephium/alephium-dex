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
import { getTokenPairState, TokenPairState, DexTokens, TokenPair, bigIntToString, PairTokenDecimals } from "../utils/dex";
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

function ListTokenPair({ tokenPair, onError, dexTokens }: { tokenPair: TokenPair, onError: any, dexTokens: DexTokens }) {
  const commonClasses = commonStyles()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)
  const token0Info = dexTokens.tokenInfos.find((info) => info.tokenId === tokenPair.token0Id)
  const token1Info = dexTokens.tokenInfos.find((info) => info.tokenId === tokenPair.token1Id)

  const handleClick = useCallback(() => {
    if (token0Info !== undefined && token1Info !== undefined) {
      setOpen(!open)
      getTokenPairState(token0Info, token1Info)
        .then((state) => {
          setTokenPairState(state)
        })
        .catch((error) => onError(error))
    }
  }, [token0Info, token1Info, onError, open])

  return (<>
    <ListItem key={tokenPair.tokenPairId} button onClick={handleClick}>
      <ListItemText>
        <Box className={classes.text}>{tokenPair.tokenPairId.slice(0, 8)}</Box>
      </ListItemText>
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open}>
      {tokenPairState && token0Info && token1Info ? (
        <>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>Token Pair Id:</p>
          <p className={commonClasses.rightAlign}>{tokenPair.tokenPairId}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{token0Info.name}</p>
          <p className={commonClasses.rightAlign}>{tokenPair.token0Id}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{token1Info.name}</p>
          <p className={commonClasses.rightAlign}>{tokenPair.token1Id}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{token0Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve0, token0Info.decimals)}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{token1Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve1, token1Info.decimals)}</p>
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

function Pools({ dexTokens }: { dexTokens: DexTokens }) {
  const commonClasses = commonStyles()
  const classes = useStyles()
  const [error, setError] = useState<string | undefined>(undefined)

  const tokenLists = dexTokens.tokenPairs.map((tokenPair) =>
    <ListTokenPair
      key={tokenPair.tokenPairId}
      tokenPair={tokenPair}
      onError={(err: any) => setError(err)}
      dexTokens={dexTokens}
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
