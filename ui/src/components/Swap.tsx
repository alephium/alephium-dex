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
import ButtonWithLoader from "../components/ButtonWithLoader";
import TokenSelectDialog from "../components/TokenSelectDialog";
import CircleLoader from "../components/CircleLoader";
import HoverIcon from "../components/HoverIcon";
import NumberTextField from "../components/NumberTextField";
import { COLORS } from "../muiTheme";
import {
  getAmountIn,
  getAmountOut,
  getTokenPairState,
  swap,
  TokenInfo,
  TokenPairState,
  DexTokens,
  stringToBigInt,
  bigIntToString
} from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { useDeadline } from "../hooks/useDeadline";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
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
  }
}));

function Swap({ dexTokens }: { dexTokens: DexTokens }) {
  const classes = useStyles();
  const [tokenInInput, setTokenInInput] = useState<string | undefined>(undefined)
  const [tokenInAmount, setTokenInAmount] = useState<bigint | undefined>(undefined)
  const [tokenOutInput, setTokenOutInput] = useState<string | undefined>(undefined)
  const [tokenOutAmount, setTokenOutAmount] = useState<bigint | undefined>(undefined)
  const [tokenInInfo, setTokenInInfo] = useState<TokenInfo | undefined>(undefined);
  const [tokenOutInfo, setTokenOutInfo] = useState<TokenInfo | undefined>(undefined);
  const [lastInput, setLastInput] = useState<'tokenIn' | 'tokenOut' | undefined>(undefined)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [swapping, setSwapping] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const wallet = useAlephiumWallet()

  const handleTokenInChange = useCallback((tokenInfo) => {
    try {
      setTokenInInfo(tokenInfo);
      if (tokenInInput !== undefined) setTokenInAmount(stringToBigInt(tokenInInput, tokenInfo.decimals))
    } catch (error) {
      console.log(`Invalid tokenIn input: ${tokenInInput}, error: ${error}`)
      setError(`${error}`)
    }
  }, [tokenInInput]);

  const handleTokenOutChange = useCallback((tokenInfo) => {
    try {
      setTokenOutInfo(tokenInfo)
      if (tokenOutInput !== undefined) setTokenOutAmount(stringToBigInt(tokenOutInput, tokenInfo.decimals))
    } catch (error) {
      console.log(`Invalid tokenOut input: ${tokenOutInput}, error: ${error}`)
      setError(`${error}`)
    }
  }, [tokenOutInput]);

  useEffect(() => {
    if (tokenInInfo !== undefined && tokenOutInfo !== undefined) {
      getTokenPairState(tokenInInfo.tokenId, tokenOutInfo.tokenId)
        .then((state) => setTokenPairState(state))
        .catch((error) => setError(error))
    }
  }, [tokenInInfo, tokenOutInfo])

  useEffect(() => {
    try {
      if (tokenPairState !== undefined && tokenInInfo !== undefined && tokenOutInfo !== undefined) {
        if (lastInput === 'tokenIn' && tokenInAmount !== undefined) {
          const tokenOutAmount = getAmountOut(tokenPairState, tokenInInfo.tokenId, tokenInAmount)
          setTokenOutAmount(tokenOutAmount)
          setTokenOutInput(bigIntToString(tokenOutAmount, tokenOutInfo.decimals))
        } else if (lastInput === 'tokenOut' && tokenOutAmount !== undefined) {
          const tokenInAmount = getAmountIn(tokenPairState, tokenOutInfo.tokenId, tokenOutAmount)
          setTokenInAmount(tokenInAmount)
          setTokenInInput(bigIntToString(tokenInAmount, tokenInInfo.decimals))
        } else {
          setTokenInAmount(undefined)
          setTokenInInput(undefined)
          setTokenOutAmount(undefined)
          setTokenOutInput(undefined)
        }
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to update token amounts: ${error}`)
    }
  }, [tokenPairState, tokenInInfo, tokenOutInfo, tokenInAmount, tokenOutAmount, lastInput])

  const handleTokenInAmountChange = useCallback(
    (event) => {
      setError(undefined)
      setLastInput('tokenIn')
      if (event.target.value === '') {
        setTokenInAmount(undefined)
        setTokenInInput(undefined)
        return
      }
      setTokenInInput(event.target.value)
      try {
        if (tokenInInfo !== undefined) {
          setTokenInAmount(stringToBigInt(event.target.value, tokenInInfo.decimals))
        }
      } catch (error) {
        console.log(`Invalid tokenIn input: ${event.target.value}, error: ${error}`)
        setError(`${error}`)
      }
    }, [tokenInInfo]
  )

  const handleTokenOutAmountChange = useCallback(
    (event) => {
      setError(undefined)
      setLastInput('tokenOut')
      if (event.target.value === '') {
        setTokenOutAmount(undefined)
        setTokenOutInput(undefined)
        return
      }
      setTokenOutInput(event.target.value)
      try {
        if (tokenOutInfo !== undefined) {
          setTokenOutAmount(stringToBigInt(event.target.value, tokenOutInfo.decimals))
        }
      } catch (error) {
        console.log(`Invalid tokenOut input: ${event.target.value}, error: ${error}`)
        setError(`${error}`)
      }
    }, [tokenOutInfo]
  )

  const swapTokens = useCallback(() => {
    setTokenInInfo(tokenOutInfo)
    setTokenOutInfo(tokenInInfo)
    setTokenInAmount(tokenOutAmount)
    setTokenOutAmount(tokenInAmount)
    setTokenInInput(tokenOutInput)
    setTokenOutInput(tokenInInput)
    if (lastInput === 'tokenIn') setLastInput('tokenOut')
    else if (lastInput === 'tokenOut') setLastInput('tokenIn')
  }, [tokenInInfo, tokenOutInfo, tokenInAmount, tokenOutAmount, tokenInInput, tokenOutInput, lastInput]);

  const handleReset = useCallback(() => {
    setTokenInInfo(undefined)
    setTokenOutInfo(undefined)
    setTokenInAmount(undefined)
    setTokenInInput(undefined)
    setTokenOutAmount(undefined)
    setTokenOutInput(undefined)
    setTokenPairState(undefined)
    setLastInput(undefined)
    setCompleted(false)
    setSwapping(false)
    setError(undefined)
  }, [])

  const sourceContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenInInfo?.tokenAddress}
        counterpart={tokenOutInfo?.tokenAddress}
        onChange={handleTokenInChange}
        style2={true}
      />
      <NumberTextField
        className={classes.numberField}
        value={tokenInInput !== undefined ? tokenInInput : ''}
        onChange={handleTokenInAmountChange}
        autoFocus={true}
        InputProps={{ disableUnderline: true }}
        disabled={!!swapping || !!completed}
      />
    </div>
  );
  const middleButton = <HoverIcon onClick={swapTokens} />;
  const targetContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenOutInfo?.tokenAddress}
        counterpart={tokenInInfo?.tokenAddress}
        onChange={handleTokenOutChange}
      />
      <NumberTextField
        className={classes.numberField}
        value={tokenOutInput !== undefined ? tokenOutInput : ''}
        onChange={handleTokenOutAmountChange}
        InputProps={{ disableUnderline: true }}
        disabled={!!swapping || !!completed}
      />
    </div>
  );

  const handleSwap = useCallback(async () => {
    try {
      setSwapping(true)
      if (
        lastInput !== undefined &&
        wallet !== undefined &&
        wallet.signer !== undefined &&
        tokenPairState !== undefined &&
        tokenInInfo !== undefined &&
        tokenInAmount !== undefined &&
        tokenOutAmount !== undefined
      ) {
        if (tokenInAmount === 0n) {
          throw new Error('the input amount must be greater than 0')
        }

        const result = await swap(
          lastInput === 'tokenIn' ? 'ExactInput' : 'ExactOutput',
          wallet.signer,
          wallet.address,
          tokenPairState.tokenPairId,
          tokenInInfo,
          tokenInAmount,
          tokenOutAmount,
          slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage,
          deadline
        )
        console.log(`swap succeed, tx id: ${result.txId}`)
        setCompleted(true)
        setSwapping(false)
      }
    } catch (error) {
      setError(`${error}`)
      setSwapping(false)
      console.error(`failed to swap, error: ${error}`)
    }
  }, [lastInput, wallet, tokenPairState, tokenInInfo, tokenInAmount, tokenOutAmount, slippage, deadline])

  const readyToSwap =
    wallet !== undefined &&
    wallet.signer !== undefined &&
    tokenInInfo !== undefined &&
    tokenOutInfo !== undefined &&
    tokenInAmount !== undefined &&
    tokenOutAmount !== undefined &&
    !swapping && !completed &&
    error === undefined
  const swapButton = (
    <ButtonWithLoader
      disabled={!readyToSwap}
      onClick={handleSwap}
      className={
        classes.gradientButton + (!readyToSwap ? " " + classes.disabled : "")
      }
    >
      Swap
    </ButtonWithLoader>
  );

  return (
    <Container className={classes.centeredContainer} maxWidth="sm">
      <div className={classes.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Swap
      </Typography>
      <div className={classes.spacer} />
      <Paper className={classes.mainPaper}>
        <Collapse in={!!completed}>
          <>
            <CheckCircleOutlineRoundedIcon
              fontSize={"inherit"}
              className={classes.successIcon}
            />
            <Typography>Swap succeed!</Typography>
            <div className={classes.spacer} />
            <div className={classes.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Swap More Coins
            </Button>
          </>
        </Collapse>
        <div className={classes.loaderHolder}>
          <Collapse in={!!swapping && !completed}>
            <div className={classes.loaderHolder}>
              <CircleLoader />
              <div className={classes.spacer} />
              <div className={classes.spacer} />
              <Typography variant="h5">
                Swapping...
              </Typography>
              <div className={classes.spacer} />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse in={!swapping && !completed}>
            {
              <>
                {sourceContent}
                {middleButton}
                {targetContent}
                {error ? (
                  <Typography variant="body2" color="error" className={classes.error}>
                    {error}
                  </Typography>
                ) : null}
                <div className={classes.spacer} />
              </>
            }
            {swapButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

export default Swap;
