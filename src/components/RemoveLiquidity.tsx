import { Button, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useEffect, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import CircleLoader from "./CircleLoader";
import NumberTextField from "./NumberTextField";
import { TokenInfo } from '@alephium/token-list'
import {
  removeLiquidity,
  RemoveLiquidityResult,
  getRemoveLiquidityResult,
  PairTokenDecimals,
  stringToBigInt,
  bigIntToString
} from "../utils/dex";
import { formatUnits } from "ethers/lib/utils";
import { useAlephiumWallet, useAvailableBalances } from "../hooks/useAlephiumWallet";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { useDeadline } from "../hooks/useDeadline";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { commonStyles } from "./style";
import { useTokenPairState } from "../state/useTokenPairState";

function RemoveLiquidity() {
  const classes = commonStyles();
  const [amountInput, setAmountInput] = useState<string | undefined>(undefined)
  const [amount, setAmount] = useState<bigint | undefined>(undefined)
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [totalLiquidityAmount, setTotalLiquidityAmount] = useState<bigint | undefined>(undefined)
  const [removeLiquidityResult, setRemoveLiquidityResult] = useState<RemoveLiquidityResult | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [removingLiquidity, setRemovingLiquidity] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()
  const availableBalance = useAvailableBalances()

  const handleTokenAChange = useCallback((tokenInfo) => {
    setTokenAInfo(tokenInfo);
  }, []);

  const handleTokenBChange = useCallback((tokenInfo) => {
    setTokenBInfo(tokenInfo)
  }, []);

  const { tokenPairState, getTokenPairStateError } = useTokenPairState(tokenAInfo, tokenBInfo)

  useEffect(() => {
    setTotalLiquidityAmount(undefined)
    if (tokenPairState !== undefined && getTokenPairStateError === undefined) {
      const balance = availableBalance.get(tokenPairState.tokenPairId)
      setTotalLiquidityAmount(balance === undefined ? 0n : balance)
    }
  }, [tokenPairState, getTokenPairStateError, availableBalance])

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
        tokenId={tokenAInfo?.id}
        counterpart={tokenBInfo?.id}
        onChange={handleTokenAChange}
        mediumSize={true}
      />
      <TokenSelectDialog
        tokenId={tokenBInfo?.id}
        counterpart={tokenAInfo?.id}
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
          wallet.nodeProvider,
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
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    amount !== undefined &&
    totalLiquidityAmount !== undefined &&
    removeLiquidityResult !== undefined &&
    !removingLiquidity && !completed && 
    error === undefined &&
    getTokenPairStateError === undefined
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
    const amount = tokenInfo.id === removeLiquidityResult.token0Id ? removeLiquidityResult.amount0 : removeLiquidityResult.amount1
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
                  ) : getTokenPairStateError ? (
                    <Typography variant="body2" color="error" className={classes.error}>
                      {getTokenPairStateError}
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
