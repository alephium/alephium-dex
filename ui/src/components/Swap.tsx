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
import { getAmountIn, getAmountOut, getTokenPairState, swap, TokenInfo, TokenPairState, DexTokens, stringToBigInt, bigIntToString } from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";

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
  // TODO: improve state management
  const [tokenInAmountStr, setTokenInAmountStr] = useState<string | undefined>(undefined)
  const [tokenInAmount, setTokenInAmount] = useState<bigint | undefined>(undefined)
  const [tokenOutAmountStr, setTokenOutAmountStr] = useState<string | undefined>(undefined)
  const [tokenOutAmount, setTokenOutAmount] = useState<bigint | undefined>(undefined)
  const [tokenInInfo, setTokenInInfo] = useState<TokenInfo | undefined>(undefined);
  const [tokenOutInfo, setTokenOutInfo] = useState<TokenInfo | undefined>(undefined);
  const [lastInput, setLastInput] = useState<'tokenIn' | 'tokenOut' | undefined>(undefined)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [swapping, setSwapping] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  const handleTokenInChange = useCallback((tokenInfo) => {
    setTokenInInfo(tokenInfo);
  }, []);

  const handleTokenOutChange = useCallback((tokenInfo) => {
    setTokenOutInfo(tokenInfo)
  }, []);

  useEffect(() => {
    if (tokenInInfo !== undefined && tokenOutInfo !== undefined) {
      getTokenPairState(tokenInInfo.tokenId, tokenOutInfo.tokenId)
        .then((state) => setTokenPairState(state))
        .catch((error) => setError(error))
    }
  }, [tokenInInfo, tokenOutInfo])

  useEffect(() => {
    if (tokenInInfo !== undefined && tokenInAmountStr !== undefined) {
      try {
        setTokenInAmount(stringToBigInt(tokenInAmountStr, tokenInInfo.decimals))
      } catch (e) {
        setError(`Invalid token in amount ${e}`)
      }
    }
  }, [tokenInInfo, tokenInAmountStr])

  useEffect(() => {
    if (tokenOutInfo !== undefined && tokenOutAmountStr !== undefined) {
      try {
        setTokenOutAmount(stringToBigInt(tokenOutAmountStr, tokenOutInfo.decimals))
      } catch (e) {
        setError(`Invalid token out amount ${e}`)
      }
    }
  }, [tokenOutInfo, tokenOutAmountStr])

  useEffect(() => {
    try {
      if (tokenPairState !== undefined && tokenInInfo !== undefined && tokenOutInfo !== undefined) {
        if (lastInput === 'tokenIn' && tokenInAmount === undefined) {
          setTokenOutAmount(undefined)
          setTokenOutAmountStr(undefined)
          return
        }
        if (lastInput === 'tokenIn' && tokenInAmount !== undefined) {
          const tokenOutAmount = getAmountOut(tokenPairState, tokenInInfo.tokenId, tokenInAmount)
          setTokenOutAmount(tokenOutAmount)
          setTokenOutAmountStr(bigIntToString(tokenOutAmount, tokenOutInfo.decimals))
          return
        }
        if (lastInput === 'tokenOut' && tokenOutAmount === undefined) {
          setTokenInAmount(undefined)
          setTokenInAmountStr(undefined)
          return
        }
        if (lastInput === 'tokenOut' && tokenOutAmount !== undefined) {
          const tokenInAmount = getAmountIn(tokenPairState, tokenOutInfo.tokenId, tokenOutAmount)
          setTokenInAmount(tokenInAmount)
          setTokenInAmountStr(bigIntToString(tokenInAmount, tokenInInfo.decimals))
          return
        }
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to update token amounts: ${error}`)
    }
  }, [tokenPairState, tokenInInfo, tokenOutInfo, tokenInAmount, tokenOutAmount, lastInput])

  const handleTokenInAmountChange = useCallback(
    (event) => {
      try {
        setError(undefined)
        setLastInput('tokenIn')
        if (event.target.value === '') {
          setTokenInAmount(undefined)
          setTokenInAmountStr(undefined)
          return
        }
        setTokenInAmountStr(event.target.value)
        if (tokenInInfo !== undefined) {
          setTokenInAmount(stringToBigInt(event.target.value, tokenInInfo.decimals))
        }
      } catch (error) {
        setError(`${error}`)
        console.error(`handleTokenInAmountChange error: ${error}`)
      }
    }, [tokenInInfo]
  )

  const handleTokenOutAmountChange = useCallback(
    (event) => {
      try {
        setError(undefined)
        setLastInput('tokenOut')
        if (event.target.value === '') {
          setTokenOutAmount(undefined)
          setTokenOutAmountStr(undefined)
          return
        }
        setTokenOutAmountStr(event.target.value)
        if (tokenOutInfo !== undefined) {
          setTokenOutAmount(stringToBigInt(event.target.value, tokenOutInfo.decimals))
        }
      } catch (error) {
        setError(`${error}`)
        console.log(`handleTokenOutAmountChange error: ${error}`)
      }
    }, [tokenOutInfo]
  )

  const swapTokens = useCallback(() => {
    setTokenInInfo(tokenOutInfo)
    setTokenOutInfo(tokenInInfo)
    setTokenInAmount(tokenOutAmount)
    setTokenOutAmount(tokenInAmount)
    setTokenInAmountStr(tokenOutAmountStr)
    setTokenOutAmountStr(tokenInAmountStr)
    if (lastInput === 'tokenIn') setLastInput('tokenOut')
    else if (lastInput === 'tokenOut') setLastInput('tokenIn')
  }, [tokenInInfo, tokenOutInfo, tokenInAmount, tokenOutAmount, tokenInAmountStr, tokenOutAmountStr, lastInput]);

  const handleReset = useCallback(() => {
    setTokenInInfo(undefined)
    setTokenOutInfo(undefined)
    setTokenInAmount(undefined)
    setTokenInAmountStr(undefined)
    setTokenOutAmount(undefined)
    setTokenOutAmountStr(undefined)
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
        value={tokenInAmountStr !== undefined ? tokenInAmountStr : ''}
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
        value={tokenOutAmountStr !== undefined ? tokenOutAmountStr : ''}
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
          tokenOutAmount
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
  }, [lastInput, wallet, tokenPairState, tokenInInfo, tokenInAmount, tokenOutAmount])

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
