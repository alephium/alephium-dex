import { Button, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useMemo, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import CircleLoader from "./CircleLoader";
import NumberTextField from "./NumberTextField";
import { addLiquidity, bigIntToString, PairTokenDecimals, minimalAmount, AddLiquidityResult, TokenPairState, tryGetBalance } from "../utils/dex";
import { useAlephiumWallet, useAvailableBalances } from "../hooks/useAlephiumWallet";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { useDeadline } from "../hooks/useDeadline";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { useDispatch, useSelector } from 'react-redux'
import { reset, selectTokenA, selectTokenB, typeInput } from "../state/mint/actions";
import { useDerivedMintInfo } from "../state/mint/hooks";
import { selectMintState } from "../state/mint/selectors";
import { commonStyles } from "./style";

function AddLiquidity() {
  const classes = commonStyles();
  const [completed, setCompleted] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()
  const balance = useAvailableBalances()

  const handleTokenAChange = useCallback((tokenInfo) => {
    dispatch(selectTokenA(tokenInfo))
  }, [dispatch]);

  const handleTokenBChange = useCallback((tokenInfo) => {
    dispatch(selectTokenB(tokenInfo))
  }, [dispatch]);

  const { tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult } = useDerivedMintInfo(setError)

  const handleTokenAAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenA', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const handleTokenBAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenB', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const handleReset = useCallback(() => {
    dispatch(reset())
    setCompleted(false)
    setError(undefined)
  }, [dispatch])

  const tokenABalance = useMemo(() => {
    return tryGetBalance(balance, tokenAInfo)
  }, [balance, tokenAInfo])

  const tokenBBalance = useMemo(() => {
    return tryGetBalance(balance, tokenBInfo)
  }, [balance, tokenBInfo])

  const sourceContent = (
    <div className={classes.tokenContainerWithBalance}>
      <div className={classes.inputRow}>
        <TokenSelectDialog
          tokenId={tokenAInfo?.id}
          counterpart={tokenBInfo?.id}
          onChange={handleTokenAChange}
          tokenBalances={balance}
          style2={true}
        />
        <NumberTextField
          className={classes.numberField}
          value={tokenAInput !== undefined ? tokenAInput : ''}
          onChange={handleTokenAAmountChange}
          autoFocus={true}
          InputProps={{ disableUnderline: true }}
          disabled={!!completed}
        />
      </div>
      {tokenABalance ?
        (<Typography className={classes.balance}>
          Balance: {tokenABalance}
        </Typography>) : null}
    </div>
  );
  const targetContent = (
    <div className={classes.tokenContainerWithBalance}>
      <div className={classes.inputRow}>
        <TokenSelectDialog
          tokenId={tokenBInfo?.id}
          counterpart={tokenAInfo?.id}
          onChange={handleTokenBChange}
          tokenBalances={balance}
        />
        <NumberTextField
          className={classes.numberField}
          value={tokenBInput !== undefined ? tokenBInput : ''}
          onChange={handleTokenBAmountChange}
          InputProps={{ disableUnderline: true }}
          disabled={!!completed}
        />
      </div>
      {tokenBBalance ?
        (<Typography className={classes.balance}>
          Balance: {tokenBBalance}
        </Typography>) : null}
    </div>
  );

  const handleAddLiquidity = useCallback(async () => {
    try {
      if (
        wallet !== undefined &&
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
          balance,
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
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to add liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, tokenAAmount, tokenBAmount, slippage, deadline, balance])

  const readyToAddLiquidity =
    wallet !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    tokenAAmount !== undefined &&
    tokenBAmount !== undefined &&
    !completed && error === undefined
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

  const formatAddLiquidityResult = (state: TokenPairState, result: AddLiquidityResult, slippage: number | 'auto') => {
    const slippageTolerance = slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage
    const [tokenA, tokenB] = result.tokenAId === state.token0Info.id
      ? [{ info: state.token0Info, amount: result.amountA }, { info: state.token1Info, amount: result.amountB }]
      : [{ info: state.token1Info, amount: result.amountA }, { info: state.token0Info, amount: result.amountB }]
    return <>
      <div className={classes.notification}>
        <p className={classes.leftAlign}>Share amount:</p>
        <p className={classes.rightAlign}>{bigIntToString(result.shareAmount, PairTokenDecimals)}</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.leftAlign}>Share percentage:</p>
        <p className={classes.rightAlign}>{result.sharePercentage}%</p>
      </div>
      {state.reserve0 > 0n ? (
        <>
          <div className={classes.notification}>
            <p className={classes.leftAlign}>Minimal amount of {tokenA.info.symbol}:</p>
            <p className={classes.rightAlign}>{bigIntToString(minimalAmount(tokenA.amount, slippageTolerance), tokenA.info.decimals)}</p>
          </div>
          <div className={classes.notification}>
            <p className={classes.leftAlign}>Minimal amount of {tokenB.info.symbol}:</p>
            <p className={classes.rightAlign}>{bigIntToString(minimalAmount(tokenB.amount, slippageTolerance), tokenB.info.decimals)}</p>
          </div>
        </>
      ) : null}
    </>
  }

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
            <Typography>The add liquidity transaction has been submitted, please wait for confirmation.</Typography>
            <div className={classes.spacer} />
            <div className={classes.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Add More Liquidity!
            </Button>
          </>
        </Collapse>
        {wallet === undefined ?
          <div>
            <Typography variant="h6" color="error" className={classes.error}>
              Your wallet is not connected
            </Typography>
          </div> : null
        }
        <div>
          <Collapse in={!completed && wallet !== undefined}>
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
            {addLiquidityResult && tokenPairState && !error ? (formatAddLiquidityResult(tokenPairState, addLiquidityResult, slippage)) : null}
            {addLiquidityButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

export default AddLiquidity;
