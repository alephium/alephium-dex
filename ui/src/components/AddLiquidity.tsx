import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useEffect, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import CircleLoader from "./CircleLoader";
import NumberTextField from "./NumberTextField";
import { COLORS } from "../muiTheme";
import {
  getAddLiquidityResult,
  getTokenPairState,
  addLiquidity,
  AddLiquidityResult,
  TokenInfo,
  TokenPairState,
  getInitAddLiquidityResult,
  formatAddLiquidityResult,
  DexTokens,
  stringToBigInt,
  bigIntToString
} from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { useDeadline } from "../hooks/useDeadline";
import { DEFAULT_SLIPPAGE } from "../state/reducer";

const useStyles = makeStyles((theme) => ({
  numberField: {
    flexGrow: 1,
    "& > * > .MuiInputBase-input": {
      textAlign: "right",
      height: "100%",
      flexGrow: "1",
      fontSize: "1.5rem",
      fontFamily: "Roboto Mono, monospace",
      caretShape: "block",
      width: "0",
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        margin: 0,
      }
    },
    "& > * > input::-webkit-inner-spin-button": {
      webkitAppearance: "none",
      margin: "0",
    },
  },
  tokenContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "3px solid #333333",
    padding: ".6rem",
    borderRadius: "10px",
    "& > *": {
      margin: ".1rem",
    },
    margin: ".5rem 0rem .5rem 0rem",
    height: "60px"
  },
  centeredContainer: {
    textAlign: "center",
    width: "100%",
  },
  spacer: {
    height: "1rem",
  },
  mainPaper: {
    padding: "2rem",
    backgroundColor: COLORS.nearBlackWithMinorTransparency,
  },
  titleBar: {
    marginTop: "10rem",
    "& > *": {
      margin: ".5rem",
      alignSelf: "flex-end",
    },
  },
  gradientButton: {
    backgroundImage: `linear-gradient(45deg, ${COLORS.blue} 0%, ${COLORS.nearBlack}20 50%,  ${COLORS.blue}30 62%, ${COLORS.nearBlack}50  120%)`,
    transition: "0.75s",
    backgroundSize: "200% auto",
    boxShadow: "0 0 20px #222",
    "&:hover": {
      backgroundPosition:
        "right center" /* change the direction of the change here */,
    },
    width: "100%",
    height: "3rem",
    marginTop: "1rem",
  },
  disabled: {
    background: COLORS.gray,
  },
  loaderHolder: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  successIcon: {
    color: COLORS.green,
    fontSize: "200px",
  },
  error: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  notification: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    fontSize: "15px",
    color: COLORS.green
  }
}));

function AddLiquidity({ dexTokens }: { dexTokens: DexTokens }) {
  const classes = useStyles();
  const [tokenAInput, setTokenAInput] = useState<string | undefined>(undefined)
  const [tokenAAmount, setTokenAAmount] = useState<bigint | undefined>(undefined)
  const [tokenBInput, setTokenBInput] = useState<string | undefined>(undefined)
  const [tokenBAmount, setTokenBAmount] = useState<bigint | undefined>(undefined)
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [lastInput, setLastInput] = useState<'tokenA' | 'tokenB' | undefined>(undefined)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)
  const [addLiquidityResult, setAddLiquidityResult] = useState<AddLiquidityResult | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [addingLiquidity, setAddingLiquidity] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  const handleTokenAChange = useCallback((tokenInfo) => {
    try {
      setTokenAInfo(tokenInfo);
      if (tokenAInput !== undefined) setTokenAAmount(stringToBigInt(tokenAInput, tokenInfo.decimals))
    } catch (error) {
      console.log(`Invalid tokenA input: ${tokenAInput}, error: ${error}`)
      setError(`${error}`)
    }
  }, [tokenAInput]);

  const handleTokenBChange = useCallback((tokenInfo) => {
    try {
      setTokenBInfo(tokenInfo)
      if (tokenBInput !== undefined) setTokenBAmount(stringToBigInt(tokenBInput, tokenInfo.decimals))
    } catch (error) {
      console.log(`Invalid tokenB input: ${tokenBInput}, error: ${error}`)
      setError(`${error}`)
    }
  }, [tokenBInput]);

  useEffect(() => {
    setAddLiquidityResult(undefined)
    if (tokenAInfo !== undefined && tokenBInfo !== undefined) {
      getTokenPairState(tokenAInfo.tokenId, tokenBInfo.tokenId)
        .then((state) => setTokenPairState(state))
        .catch((error) => setError(error))
    }
  }, [tokenAInfo, tokenBInfo])

  useEffect(() => {
    setAddLiquidityResult(undefined)
    try {
      if (tokenPairState !== undefined && tokenAInfo !== undefined && tokenBInfo !== undefined) {
        if (tokenPairState.reserve0 === 0n && tokenPairState.reserve1 === 0n) {
          // initial add liquidity
          if (tokenAAmount !== undefined && tokenBAmount !== undefined) {
            const addLiquidityResult = getInitAddLiquidityResult(tokenAAmount, tokenBAmount)
            setAddLiquidityResult(addLiquidityResult)
          }
          return
        }

        if (lastInput === 'tokenA' && tokenAAmount !== undefined) {
          const addLiquidityResult = getAddLiquidityResult(tokenPairState, tokenAInfo.tokenId, tokenAAmount, 'TokenA')
          setTokenBAmount(addLiquidityResult.amountB)
          setTokenBInput(bigIntToString(addLiquidityResult.amountB, tokenBInfo.decimals))
          setAddLiquidityResult(addLiquidityResult)
        } else if (lastInput === 'tokenB' && tokenBAmount !== undefined) {
          const addLiquidityResult = getAddLiquidityResult(tokenPairState, tokenBInfo.tokenId, tokenBAmount, 'TokenB')
          setTokenAAmount(addLiquidityResult.amountA)
          setTokenAInput(bigIntToString(addLiquidityResult.amountA, tokenAInfo.decimals))
          setAddLiquidityResult(addLiquidityResult)
        } else {
          setTokenAAmount(undefined)
          setTokenAInput(undefined)
          setTokenBAmount(undefined)
          setTokenBInput(undefined)
          setAddLiquidityResult(undefined)
        }
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to update token amounts: ${error}`)
    }
  }, [tokenPairState, tokenAInfo, tokenBInfo, tokenAAmount, tokenBAmount, lastInput])

  const handleTokenAAmountChange = useCallback(
    (event) => {
      setError(undefined)
      setLastInput('tokenA')
      if (event.target.value === '') {
        setTokenAAmount(undefined)
        setTokenAInput(undefined)
        return
      }
      setTokenAInput(event.target.value)
      try {
        if (tokenAInfo !== undefined) {
          setTokenAAmount(stringToBigInt(event.target.value, tokenAInfo.decimals))
        }
      } catch (error) {
        console.log(`Invalid tokenA input: ${event.target.value}, error: ${error}`)
        setError(`${error}`)
      }
    }, [tokenAInfo]
  )

  const handleTokenBAmountChange = useCallback(
    (event) => {
      setError(undefined)
      setLastInput('tokenB')
      if (event.target.value === '') {
        setTokenBAmount(undefined)
        setTokenBInput(undefined)
        return
      }
      setTokenBInput(event.target.value)
      try {
        if (tokenBInfo !== undefined) {
          setTokenBAmount(stringToBigInt(event.target.value, tokenBInfo.decimals))
        }
      } catch (error) {
        console.log(`Invalid tokenB input: ${event.target.value}, error: ${error}`)
        setError(`${error}`)
      }
    }, [tokenBInfo]
  )

  const handleReset = useCallback(() => {
    setTokenAInfo(undefined)
    setTokenBInfo(undefined)
    setTokenAAmount(undefined)
    setTokenAInput(undefined)
    setTokenBAmount(undefined)
    setTokenBInput(undefined)
    setTokenPairState(undefined)
    setLastInput(undefined)
    setCompleted(false)
    setAddingLiquidity(false)
    setAddLiquidityResult(undefined)
    setError(undefined)
  }, [])

  const sourceContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenAInfo?.tokenAddress}
        counterpart={tokenBInfo?.tokenAddress}
        onChange={handleTokenAChange}
        style2={true}
      />
      <NumberTextField
        className={classes.numberField}
        value={tokenAInput !== undefined ? tokenAInput : ''}
        onChange={handleTokenAAmountChange}
        autoFocus={true}
        InputProps={{ disableUnderline: true }}
        disabled={!!addingLiquidity || !!completed}
      />
    </div>
  );
  const targetContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenBInfo?.tokenAddress}
        counterpart={tokenAInfo?.tokenAddress}
        onChange={handleTokenBChange}
      />
      <NumberTextField
        className={classes.numberField}
        value={tokenBInput !== undefined ? tokenBInput : ''}
        onChange={handleTokenBAmountChange}
        InputProps={{ disableUnderline: true }}
        disabled={!!addingLiquidity || !!completed}
      />
    </div>
  );

  const handleAddLiquidity = useCallback(async () => {
    try {
      setAddingLiquidity(true)
      if (
        wallet !== undefined &&
        wallet.signer !== undefined &&
        tokenPairState !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        tokenAAmount !== undefined &&
        tokenBAmount !== undefined
      ) {
        if (tokenAAmount === 0n || tokenBAmount === 0n) {
          throw new Error('the input amount must be greater than 0')
        }

        const result = await addLiquidity(
          wallet.signer,
          wallet.address,
          tokenPairState,
          tokenAInfo,
          tokenBInfo,
          tokenAAmount,
          tokenBAmount,
          slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage,
          deadline
        )
        console.log(`add liquidity succeed, tx id: ${result.txId}`)
        setCompleted(true)
        setAddingLiquidity(false)
      }
    } catch (error) {
      setError(`${error}`)
      setAddingLiquidity(false)
      console.error(`failed to add liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, tokenAAmount, tokenBAmount, slippage, deadline])

  const readyToAddLiquidity =
    wallet !== undefined &&
    wallet.signer !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    tokenAAmount !== undefined &&
    tokenBAmount !== undefined &&
    !addingLiquidity && !completed && 
    error === undefined
  const addLiquidityButton = (
    <ButtonWithLoader
      disabled={!readyToAddLiquidity}
      onClick={handleAddLiquidity}
      className={
        classes.gradientButton + (!readyToAddLiquidity ? " " + classes.disabled : "")
      }
    >
      Add Liquidity
    </ButtonWithLoader>
  );

  return (
    <Container className={classes.centeredContainer} maxWidth="sm">
      <div className={classes.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Add Liquidity
      </Typography>
      <div className={classes.spacer} />
      <Paper className={classes.mainPaper}>
        <Collapse in={!!completed}>
          <>
            <CheckCircleOutlineRoundedIcon
              fontSize={"inherit"}
              className={classes.successIcon}
            />
            <Typography>Add liquidity succeed!</Typography>
            <div className={classes.spacer} />
            <div className={classes.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Add More Liquidity!
            </Button>
          </>
        </Collapse>
        <div className={classes.loaderHolder}>
          <Collapse in={!!addingLiquidity && !completed}>
            <div className={classes.loaderHolder}>
              <CircleLoader />
              <div className={classes.spacer} />
              <div className={classes.spacer} />
              <Typography variant="h5">
                Adding liquidity...
              </Typography>
              <div className={classes.spacer} />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse in={!addingLiquidity && !completed}>
            {
              <>
                {sourceContent}
                <div className={classes.spacer} />
                {targetContent}
                {error ? (
                  <Typography variant="body2" color="error" className={classes.error}>
                    {error}
                  </Typography>
                ) : null}
                <div className={classes.spacer} />
              </>
            }
            {addLiquidityResult && !error ? (
              <>
                <div className={classes.spacer} />
                <Typography variant="body2" className={classes.notification}>
                  {formatAddLiquidityResult(addLiquidityResult)}
                </Typography>
                <div className={classes.spacer} />
              </>
            ) : null}
            {addLiquidityButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

export default AddLiquidity;
