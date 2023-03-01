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
  getTokenPairState,
  TokenInfo,
  TokenPairState,
  removeLiquidity,
  RemoveLiquidityResult,
  getRemoveLiquidityResult,
  getBalanceByTokenId,
  DexTokens,
  PairTokenDecimals,
  stringToBigInt,
  bigIntToString
} from "../utils/dex";
import { formatUnits } from "ethers/lib/utils";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { useDeadline } from "../hooks/useDeadline";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";

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
  tokenPairContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: ".5rem 0rem .5rem 0rem",
    height: "30px"
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
    display: 'flex',
    justifyContent: 'space-between'
  },
  leftAlign: {
    textAlign: "left",
    fontSize: "15px",
    fontFamily: "monospace"
  },
  rightAlign: {
    textAlign: "right",
    fontSize: "15px",
    fontFamily: "monospace"
  },
}));

function RemoveLiquidity({ dexTokens }: { dexTokens: DexTokens }) {
  const classes = useStyles();
  const [amountInput, setAmountInput] = useState<string | undefined>(undefined)
  const [amount, setAmount] = useState<bigint | undefined>(undefined)
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenPairState, setTokenPairState] = useState<TokenPairState | undefined>(undefined)
  const [totalLiquidityAmount, setTotalLiquidityAmount] = useState<bigint | undefined>(undefined)
  const [removeLiquidityResult, setRemoveLiquidityResult] = useState<RemoveLiquidityResult | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [removingLiquidity, setRemovingLiquidity] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  const handleTokenAChange = useCallback((tokenInfo) => {
    setTokenAInfo(tokenInfo);
  }, []);

  const handleTokenBChange = useCallback((tokenInfo) => {
    setTokenBInfo(tokenInfo)
  }, []);

  useEffect(() => {
    setRemoveLiquidityResult(undefined)
    setTotalLiquidityAmount(undefined)
    if (
      tokenAInfo !== undefined &&
      tokenBInfo !== undefined &&
      wallet !== undefined &&
      wallet.signer !== undefined
    ) {
      getTokenPairState(tokenAInfo, tokenBInfo)
        .then((state) => {
          setTokenPairState(state)
          getBalanceByTokenId(state.tokenPairId, wallet.address)
            .then((balance) => setTotalLiquidityAmount(balance))
            .catch((error) => setError(error))
        })
        .catch((error) => setError(error))
    }
  }, [tokenAInfo, tokenBInfo, wallet])

  useEffect(() => {
    setRemoveLiquidityResult(undefined)
    try {
      if (
        tokenPairState !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        amount !== undefined &&
        totalLiquidityAmount !== undefined
      ) {
        const result = getRemoveLiquidityResult({ ...tokenPairState, totalLiquidityAmount }, amount)
        setRemoveLiquidityResult(result)
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to update token amounts: ${error}`)
    }
  }, [tokenPairState, tokenAInfo, tokenBInfo, amount, totalLiquidityAmount])

  const handleAmountChanged = useCallback(
    (event) => {
      setError(undefined)
      setRemoveLiquidityResult(undefined)
      if (event.target.value === '') {
        setAmount(undefined)
        setAmountInput(undefined)
        return
      }
      setAmountInput(event.target.value)
      try {
        setAmount(stringToBigInt(event.target.value, PairTokenDecimals))
      } catch (error) {
        console.log(`Invalid input: ${event.target.value}, error: ${error}`)
        setError(`${error}`)
      }
    }, []
  )

  const handleReset = useCallback(() => {
    setTokenAInfo(undefined)
    setTokenBInfo(undefined)
    setTokenPairState(undefined)
    setAmount(undefined)
    setAmountInput(undefined)
    setTotalLiquidityAmount(undefined)
    setCompleted(false)
    setRemovingLiquidity(false)
    setRemoveLiquidityResult(undefined)
    setError(undefined)
  }, [])

  const tokenPairContent = (
    <div className={classes.tokenPairContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenAInfo?.tokenAddress}
        counterpart={tokenBInfo?.tokenAddress}
        onChange={handleTokenAChange}
        mediumSize={true}
      />
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenBInfo?.tokenAddress}
        counterpart={tokenAInfo?.tokenAddress}
        onChange={handleTokenBChange}
        mediumSize={true}
      />
    </div>
  )
  
  const amountInputBox = (
    <div className={classes.tokenContainer}>
      <NumberTextField
        className={classes.numberField}
        value={amountInput !== undefined ? amountInput : ''}
        onChange={handleAmountChanged}
        autoFocus={true}
        InputProps={{ disableUnderline: true }}
        disabled={!!removingLiquidity || !!completed}
      />
    </div>
  )

  const handleRemoveLiquidity = useCallback(async () => {
    try {
      setRemovingLiquidity(true)
      if (
        wallet !== undefined &&
        wallet.signer !== undefined &&
        tokenPairState !== undefined &&
        removeLiquidityResult !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        amount !== undefined
      ) {
        if (amount === 0n) {
          throw new Error('the input amount must be greater than 0')
        }

        const result = await removeLiquidity(
          wallet.signer,
          wallet.address,
          tokenPairState.tokenPairId,
          amount,
          removeLiquidityResult.amount0,
          removeLiquidityResult.amount1,
          slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage,
          deadline
        )
        console.log(`remove liquidity succeed, tx id: ${result.txId}`)
        setCompleted(true)
        setRemovingLiquidity(false)
      }
    } catch (error) {
      setError(`${error}`)
      setRemovingLiquidity(false)
      console.error(`failed to remove liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, amount, removeLiquidityResult, slippage, deadline])

  const readyToRemoveLiquidity =
    wallet !== undefined &&
    wallet.signer !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    amount !== undefined &&
    totalLiquidityAmount !== undefined &&
    removeLiquidityResult !== undefined &&
    !removingLiquidity && !completed && 
    error === undefined
  const removeLiquidityButton = (
    <ButtonWithLoader
      disabled={!readyToRemoveLiquidity}
      onClick={handleRemoveLiquidity}
      className={
        classes.gradientButton + (!readyToRemoveLiquidity ? " " + classes.disabled : "")
      }
    >
      Remove Liquidity
    </ButtonWithLoader>
  );

  const getTokenAmount = (removeLiquidityResult: RemoveLiquidityResult, tokenInfo: TokenInfo): string => {
    const amount = tokenInfo.tokenId === removeLiquidityResult.token0Id ? removeLiquidityResult.amount0 : removeLiquidityResult.amount1
    return formatUnits(amount, tokenInfo.decimals)
  }

  const formatRemoveLiquidityResult = (result: RemoveLiquidityResult, amount: bigint) => {
    return <>
        <div className={classes.notification}>
          <p className={classes.leftAlign}>Remove share amount:</p>
          <p className={classes.rightAlign}>{bigIntToString(amount, PairTokenDecimals)}</p>
        </div>
        <div className={classes.notification}>
          <p className={classes.leftAlign}>Token {tokenAInfo!.name}:</p>
          <p className={classes.rightAlign}>{getTokenAmount(result, tokenAInfo!)}</p>
        </div>
        <div className={classes.notification}>
          <p className={classes.leftAlign}>Token {tokenBInfo!.name}:</p>
          <p className={classes.rightAlign}>{getTokenAmount(result, tokenBInfo!).toString()}</p>
        </div>
        <div className={classes.notification}>
          <p className={classes.leftAlign}>Remain share amount:</p>
          <p className={classes.rightAlign}>{formatUnits(result.remainShareAmount, PairTokenDecimals)}</p>
        </div>
        <div className={classes.notification}>
          <p className={classes.leftAlign}>Remain share percentage:</p>
          <p className={classes.rightAlign}>{result.remainSharePercentage}%</p>
        </div>
      </>
  }

  return (
    <Container className={classes.centeredContainer} maxWidth="sm">
      <div className={classes.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Remove Liquidity
      </Typography>
      <div className={classes.spacer} />
      <Paper className={classes.mainPaper}>
        <Collapse in={!!completed}>
          <>
            <CheckCircleOutlineRoundedIcon
              fontSize={"inherit"}
              className={classes.successIcon}
            />
            <Typography>Remove liquidity succeed!</Typography>
            <div className={classes.spacer} />
            <div className={classes.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Remove More Liquidity!
            </Button>
          </>
        </Collapse>
        <div className={classes.loaderHolder}>
          <Collapse in={!!removingLiquidity && !completed}>
            <div className={classes.loaderHolder}>
              <CircleLoader />
              <div className={classes.spacer} />
              <div className={classes.spacer} />
              <Typography variant="h5">
                Removing liquidity...
              </Typography>
              <div className={classes.spacer} />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse in={!removingLiquidity && !completed}>
            {
              <>
                {tokenPairContent}
                <div className={classes.spacer} />
                {totalLiquidityAmount !== undefined ? (
                  <>
                    <div className={classes.notification}>
                      <p className={classes.leftAlign}>Total share amount:</p>
                      <p className={classes.rightAlign}>{formatUnits(totalLiquidityAmount, PairTokenDecimals)}</p>
                    </div>
                  </>
                ): null}
                {amountInputBox}
                {wallet !== undefined ? (
                <>
                  {removeLiquidityResult && amount && !error ? (formatRemoveLiquidityResult(removeLiquidityResult, amount)): null}
                  {error ? (
                    <Typography variant="body2" color="error" className={classes.error}>
                      {error}
                    </Typography>
                  ) : null}
                </>) : <></>}
                <div className={classes.spacer} />
                {removeLiquidityButton}
              </>
            }
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

export default RemoveLiquidity;
