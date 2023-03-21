import { Card, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useCallback, useEffect, useMemo, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import NumberTextField from "./NumberTextField";
import { TokenInfo } from '@alephium/token-list'
import {
  removeLiquidity,
  RemoveLiquidityDetails,
  getRemoveLiquidityDetails,
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
import { TransactionSubmitted, WaitingForTxSubmission } from "./Transactions";
import { DetailItem } from "./DetailsItem";
import { useHistory } from "react-router-dom";

function RemoveLiquidity() {
  const classes = commonStyles();
  const [amountInput, setAmountInput] = useState<string | undefined>(undefined)
  const [amount, setAmount] = useState<bigint | undefined>(undefined)
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [totalLiquidityAmount, setTotalLiquidityAmount] = useState<bigint | undefined>(undefined)
  const [removeLiquidityDetails, setRemoveLiquidityDetails] = useState<RemoveLiquidityDetails | undefined>(undefined)
  const [txId, setTxId] = useState<string | undefined>(undefined)
  const [removingLiquidity, setRemovingLiquidity] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()
  const availableBalance = useAvailableBalances()
  const history = useHistory()

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
    setRemoveLiquidityDetails(undefined)
    try {
      if (
        tokenPairState !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        amount !== undefined &&
        totalLiquidityAmount !== undefined
      ) {
        const result = getRemoveLiquidityDetails(tokenPairState, totalLiquidityAmount, amount)
        setRemoveLiquidityDetails(result)
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to update token amounts: ${error}`)
    }
  }, [tokenPairState, tokenAInfo, tokenBInfo, amount, totalLiquidityAmount])

  const handleAmountChanged = useCallback(
    (event) => {
      setError(undefined)
      setRemoveLiquidityDetails(undefined)
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

  const redirectToSwap = useCallback(() => {
    setTokenAInfo(undefined)
    setTokenBInfo(undefined)
    setAmount(undefined)
    setAmountInput(undefined)
    setTotalLiquidityAmount(undefined)
    setTxId(undefined)
    setRemovingLiquidity(false)
    setRemoveLiquidityDetails(undefined)
    setError(undefined)
    history.push('/swap')
  }, [history])

  const tokenPairContent = (
    <div className={classes.tokenPairContainer}>
      <TokenSelectDialog
        tokenId={tokenAInfo?.id}
        counterpart={tokenBInfo?.id}
        onChange={handleTokenAChange}
        tokenBalances={availableBalance}
        mediumSize={true}
      />
      <TokenSelectDialog
        tokenId={tokenBInfo?.id}
        counterpart={tokenAInfo?.id}
        onChange={handleTokenBChange}
        tokenBalances={availableBalance}
        mediumSize={true}
      />
    </div>
  )

  const completed = useMemo(() => txId !== undefined, [txId])
  
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
        wallet.signer.explorerProvider !== undefined &&
        tokenPairState !== undefined &&
        removeLiquidityDetails !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        amount !== undefined
      ) {
        if (amount === 0n) {
          throw new Error('the input amount must be greater than 0')
        }

        const result = await removeLiquidity(
          wallet.signer,
          wallet.signer.explorerProvider,
          wallet.address,
          tokenPairState.tokenPairId,
          amount,
          removeLiquidityDetails.amount0,
          removeLiquidityDetails.amount1,
          slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage,
          deadline
        )
        console.log(`remove liquidity succeed, tx id: ${result.txId}`)
        setTxId(result.txId)
        setRemovingLiquidity(false)
      }
    } catch (error) {
      setError(`${error}`)
      setRemovingLiquidity(false)
      console.error(`failed to remove liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, amount, removeLiquidityDetails, slippage, deadline])

  const readyToRemoveLiquidity =
    wallet !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    amount !== undefined &&
    totalLiquidityAmount !== undefined &&
    removeLiquidityDetails !== undefined &&
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

  return (
    <Container className={classes.centeredContainer} maxWidth="sm">
      <div className={classes.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Remove Liquidity
      </Typography>
      <div className={classes.spacer} />
      <Paper className={classes.mainPaper}>
        <WaitingForTxSubmission
          open={!!removingLiquidity && !completed}
          text="Removing Liquidity"
        />
        <TransactionSubmitted
          open={!!completed}
          txId={txId!}
          buttonText="Swap Coins"
          onClick={redirectToSwap}
        />
        {wallet === undefined ?
          <div>
            <Typography variant="h6" color="error" className={classes.error}>
              Your wallet is not connected
            </Typography>
          </div> : null
        }
        <div>
          <Collapse in={!removingLiquidity && !completed && wallet !== undefined}>
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
                <>
                  <div className={classes.spacer} />
                  {error === undefined && getTokenPairStateError === undefined
                    ? <RemoveLiquidityDetailsCard details={removeLiquidityDetails} amount={amount}/>
                    : null
                  }
                  {error ? (
                    <Typography variant="body2" color="error" className={classes.error}>
                      {error}
                    </Typography>
                  ) : getTokenPairStateError ? (
                    <Typography variant="body2" color="error" className={classes.error}>
                      {getTokenPairStateError}
                    </Typography>
                  ) : null}
                </>
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

function RemoveLiquidityDetailsCard({ details, amount } : { details: RemoveLiquidityDetails | undefined, amount: bigint | undefined }) {
  if (details === undefined || amount === undefined) {
    return null
  }
  const { state, remainShareAmount, remainSharePercentage } = details
  const getTokenAmount = (tokenInfo: TokenInfo): string => {
    const tokenAmount = tokenInfo.id === details.token0Id ? details.amount0 : details.amount1
    return bigIntToString(tokenAmount, tokenInfo.decimals)
  }
  return <Card variant='outlined' style={{ width: '100%', padding: '0', borderRadius: '10px' }}>
    <div style={{ display: 'grid', gridAutoRows: 'auto', gridRowGap: '5px', paddingTop: '10px', paddingBottom: '10px' }}>
      <DetailItem
        itemName={`The number of ${state.token0Info.symbol} you will receive:`}
        itemValue={`${getTokenAmount(state.token0Info)} ${state.token0Info.symbol}`}
      />
      <DetailItem
        itemName={`The number of ${state.token1Info.symbol} you will receive:`}
        itemValue={`${getTokenAmount(state.token1Info)} ${state.token1Info.symbol}`}
      />
      <DetailItem
        itemName={'Remain share amount:'}
        itemValue={`${bigIntToString(remainShareAmount, PairTokenDecimals)}`}
      />
      <DetailItem
        itemName={`Remain share percentage:`}
        itemValue={`${remainSharePercentage} %`}
      />
    </div>
  </Card>
}

export default RemoveLiquidity;
