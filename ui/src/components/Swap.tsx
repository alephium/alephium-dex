import { Button, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useState, useMemo } from "react";
import ButtonWithLoader from "../components/ButtonWithLoader";
import TokenSelectDialog from "../components/TokenSelectDialog";
import CircleLoader from "../components/CircleLoader";
import HoverIcon from "../components/HoverIcon";
import NumberTextField from "../components/NumberTextField";
import { swap, DexTokens, tryGetBalance } from "../utils/dex";
import { useAlephiumWallet, useAvailableBalances } from "../hooks/useAlephiumWallet";
import { useDeadline } from "../hooks/useDeadline";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { useDispatch, useSelector } from 'react-redux'
import { reset, selectTokenIn, selectTokenOut, switchTokens, typeInput } from "../state/swap/actions";
import { useDerivedSwapInfo } from "../state/swap/hooks";
import { selectSwapState } from "../state/swap/selectors";
import { commonStyles } from "./style";

function Swap({ dexTokens }: { dexTokens: DexTokens }) {
  const classes = commonStyles();
  const [completed, setCompleted] = useState<boolean>(false)
  const [swapping, setSwapping] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const wallet = useAlephiumWallet()
  const balance = useAvailableBalances()

  const handleTokenInChange = useCallback((tokenInfo) => {
    dispatch(selectTokenIn(tokenInfo))
  }, [dispatch]);

  const handleTokenOutChange = useCallback((tokenInfo) => {
    dispatch(selectTokenOut(tokenInfo))
  }, [dispatch]);

  const { tokenInInfo, tokenOutInfo } = useSelector(selectSwapState)
  const { tokenInInput, tokenOutInput, tokenInAmount, tokenOutAmount, tokenPairState, swapType } = useDerivedSwapInfo(setError)

  const handleTokenInAmountChange = useCallback((event) => {
    dispatch(typeInput({ type: 'TokenIn', value: event.target.value }))
  }, [dispatch])

  const handleTokenOutAmountChange = useCallback((event) => {
    dispatch(typeInput({ type: 'TokenOut', value: event.target.value }))
  }, [dispatch])

  const switchCallback = useCallback(() => {
    dispatch(switchTokens())
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(reset())
    setCompleted(false)
    setSwapping(false)
    setError(undefined)
  }, [dispatch])

  const tokenInBalance = useMemo(() => {
    return tryGetBalance(balance, tokenInInfo)
  }, [balance, tokenInInfo])

  const tokenOutBalance = useMemo(() => {
    return tryGetBalance(balance, tokenOutInfo)
  }, [balance, tokenOutInfo])

  const sourceContent = (
    <div className={classes.tokenContainerWithBalance}>
      <div className={classes.inputRow}>
        <TokenSelectDialog
          dexTokens={dexTokens}
          tokenId={tokenInInfo?.id}
          counterpart={tokenOutInfo?.id}
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
      {tokenInBalance ?
        (<Typography className={classes.balance}>
          Balance: {tokenInBalance}
        </Typography>) : null}
    </div>
  );
  const middleButton = <HoverIcon onClick={switchCallback} />;
  const targetContent = (
    <div className={classes.tokenContainerWithBalance}>
      <div className={classes.inputRow}>
        <TokenSelectDialog
          dexTokens={dexTokens}
          tokenId={tokenOutInfo?.id}
          counterpart={tokenInInfo?.id}
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
      {tokenOutBalance ?
        (<Typography className={classes.balance}>
          Balance: {tokenOutBalance}
        </Typography>) : null}
    </div>
  );

  const handleSwap = useCallback(async () => {
    try {
      setSwapping(true)
      if (
        swapType !== undefined &&
        wallet !== undefined &&
        tokenPairState !== undefined &&
        tokenInInfo !== undefined &&
        tokenInAmount !== undefined &&
        tokenOutAmount !== undefined
      ) {
        if (tokenInAmount === 0n) {
          throw new Error('the input amount must be greater than 0')
        }

        const result = await swap(
          swapType,
          balance,
          wallet.signer,
          wallet.nodeProvider,
          wallet.address,
          tokenPairState,
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
  }, [wallet, tokenPairState, tokenInInfo, tokenInAmount, tokenOutAmount, slippage, deadline, swapType, balance])

  const readyToSwap =
    wallet !== undefined &&
    tokenInInfo !== undefined &&
    tokenOutInfo !== undefined &&
    tokenInAmount !== undefined &&
    tokenOutAmount !== undefined &&
    swapType !== undefined &&
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
