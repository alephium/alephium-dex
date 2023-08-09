import { Card, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useCallback, useState, useMemo } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import HoverIcon from "./HoverIcon";
import NumberTextField from "./NumberTextField";
import { bigIntToString, getSwapDetails, swap, SwapDetails, tryGetBalance } from "../utils/dex";
import { useAvailableBalances } from "../hooks/useAvailableBalances";
import { useDeadline } from "../hooks/useDeadline";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { useDispatch, useSelector } from 'react-redux'
import { reset, selectTokenIn, selectTokenOut, switchTokens, typeInput } from "../state/swap/actions";
import { useDerivedSwapInfo } from "../state/swap/hooks";
import { selectSwapState } from "../state/swap/selectors";
import { commonStyles } from "./style";
import { TransactionSubmitted, WaitingForTxSubmission } from "./Transactions";
import BigNumber from "bignumber.js";
import { DetailItem } from "./DetailsItem";
import { useWallet } from "@alephium/web3-react";

function Swap() {
  const classes = commonStyles();
  const [txId, setTxId] = useState<string | undefined>(undefined)
  const [swapping, setSwapping] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const wallet = useWallet()
  const { balance, updateBalanceForTx } = useAvailableBalances()

  const handleTokenInChange = useCallback((tokenInfo) => {
    dispatch(selectTokenIn(tokenInfo))
  }, [dispatch]);

  const handleTokenOutChange = useCallback((tokenInfo) => {
    dispatch(selectTokenOut(tokenInfo))
  }, [dispatch]);

  const { tokenInInfo, tokenOutInfo } = useSelector(selectSwapState)
  const { tokenInInput, tokenOutInput, tokenInAmount, tokenOutAmount, tokenPairState, swapType } = useDerivedSwapInfo(setError)

  const swapDetails = useMemo(() => {
    if (
      swapType === undefined ||
      tokenPairState === undefined ||
      tokenInAmount === undefined ||
      tokenOutAmount === undefined ||
      tokenInInfo === undefined ||
      tokenOutInfo === undefined
    ) {
      return undefined
    }
    const slippageTolerance = slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage
    return getSwapDetails(swapType, tokenPairState, tokenInInfo, tokenOutInfo, tokenInAmount, tokenOutAmount, slippageTolerance)
  }, [tokenInAmount, tokenOutAmount, tokenPairState, swapType, tokenInInfo, tokenOutInfo, slippage])

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
    setTxId(undefined)
    setSwapping(false)
    setError(undefined)
  }, [dispatch])

  const tokenInBalance = useMemo(() => {
    return tryGetBalance(balance, tokenInInfo)
  }, [balance, tokenInInfo])

  const tokenOutBalance = useMemo(() => {
    return tryGetBalance(balance, tokenOutInfo)
  }, [balance, tokenOutInfo])

  const completed = useMemo(() => txId !== undefined, [txId])

  const sourceContent = (
    <div className={classes.tokenContainerWithBalance}>
      <div className={classes.inputRow}>
        <TokenSelectDialog
          tokenId={tokenInInfo?.id}
          counterpart={tokenOutInfo?.id}
          onChange={handleTokenInChange}
          tokenBalances={balance}
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
          tokenId={tokenOutInfo?.id}
          counterpart={tokenInInfo?.id}
          onChange={handleTokenOutChange}
          tokenBalances={balance}
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
      if (wallet !== undefined && wallet.signer.explorerProvider !== undefined && swapDetails !== undefined) {
        const result = await swap(
          swapDetails,
          balance,
          wallet.signer,
          wallet.signer.explorerProvider,
          wallet.address,
          deadline
        )
        console.log(`swap tx submitted, tx id: ${result.txId}`)
        setTxId(result.txId)
        updateBalanceForTx(result.txId)
        setSwapping(false)
      }
    } catch (error) {
      setError(`${error}`)
      setSwapping(false)
      console.error(`failed to swap, error: ${error}`)
    }
  }, [wallet, swapDetails, slippage, deadline, balance, updateBalanceForTx])

  const readyToSwap =
    wallet !== undefined &&
    !swapping && !completed &&
    error === undefined &&
    swapDetails !== undefined
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
        <WaitingForTxSubmission
          open={!!swapping && !completed}
          text="Swapping"
        />
        <TransactionSubmitted
          open={!!completed}
          txId={txId!}
          buttonText="Swap More Coins"
          onClick={handleReset}
        />
        {wallet === undefined ?
          <div>
            <Typography variant="h6" color="error" className={classes.error}>
              Your wallet is not connected
            </Typography>
          </div> : null
        }
        <div>
          <Collapse in={!swapping && !completed && wallet !== undefined}>
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
            <SwapDetailsCard swapDetails={swapDetails}></SwapDetailsCard>
            {swapButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

function formatPriceImpact(impact: number): string {
  if (impact < 0.0001) {
    return '< 0.0001'
  }
  return impact.toFixed(4)
}

function calcPrice(reserveIn: bigint, tokenInDecimals: number, reserveOut: bigint, tokenOutDecimals: number): string {
  const numerator = reserveIn * (10n ** BigInt(tokenOutDecimals))
  const denumerator = reserveOut * (10n ** BigInt(tokenInDecimals))
  const price = BigNumber(numerator.toString()).div(BigNumber(denumerator.toString()))
  const min = BigNumber('0.000001')
  if (price.lt(min)) {
    return `< ${min}`
  }
  return `= ${price.toFixed(6)}`
}

function SwapDetailsCard({ swapDetails } : { swapDetails : SwapDetails | undefined }) {
  if (swapDetails === undefined) {
    return null
  }

  const {
    swapType,
    state,
    tokenInInfo,
    tokenOutInfo,
    tokenOutAmount,
    maximalTokenInAmount,
    minimalTokenOutAmount,
    priceImpact
  } = swapDetails
  const [[reserveIn, tokenInDecimals], [reserveOut, tokenOutDecimals]] = state.token0Info.id === tokenInInfo.id
    ? [[state.reserve0, state.token0Info.decimals], [state.reserve1, state.token1Info.decimals]]
    : [[state.reserve1, state.token1Info.decimals], [state.reserve0, state.token0Info.decimals]]
  return <Card variant='outlined' style={{ width: '100%', padding: '0', borderRadius: '10px' }}>
    <div style={{ display: 'grid', gridAutoRows: 'auto', gridRowGap: '5px', paddingTop: '10px', paddingBottom: '10px' }}>
      <DetailItem
        itemName='Price:'
        itemValue={`1 ${tokenOutInfo.symbol} ${calcPrice(reserveIn, tokenInDecimals, reserveOut, tokenOutDecimals)} ${tokenInInfo.symbol}`}
      />
      <DetailItem
        itemName='Expected Output:'
        itemValue={`${bigIntToString(tokenOutAmount, tokenOutInfo.decimals)} ${tokenOutInfo.symbol}`}
      />
      <DetailItem
        itemName='Price Impact:'
        itemValue={`${formatPriceImpact(priceImpact)} %`}
      />
      <DetailItem
        itemName={swapType === 'ExactIn' ? 'Minimal received after slippage:' : 'Maximum sent after slippage:'}
        itemValue={
          swapType === 'ExactIn'
            ? `${bigIntToString(minimalTokenOutAmount!, tokenOutInfo.decimals)} ${tokenOutInfo.symbol}`
            : `${bigIntToString(maximalTokenInAmount!, tokenInInfo.decimals)} ${tokenInInfo.symbol}`
        }
      />
    </div>
  </Card>
}

export default Swap;
