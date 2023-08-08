import { Card, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useCallback, useMemo, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import TokenSelectDialog from "./TokenSelectDialog";
import NumberTextField from "./NumberTextField";
import { addLiquidity, bigIntToString, PairTokenDecimals, minimalAmount, AddLiquidityDetails, tryGetBalance } from "../utils/dex";
import { useAlephiumWallet, useAvailableBalances } from "../hooks/useAlephiumWallet";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { useDeadline } from "../hooks/useDeadline";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { useDispatch, useSelector } from 'react-redux'
import { reset, selectTokenA, selectTokenB, typeInput } from "../state/mint/actions";
import { useDerivedMintInfo } from "../state/mint/hooks";
import { selectMintState } from "../state/mint/selectors";
import { commonStyles } from "./style";
import { useHistory } from "react-router-dom";
import { TransactionSubmitted, WaitingForTxSubmission } from "./Transactions";
import { DetailItem } from "./DetailsItem";

function AddLiquidity() {
  const classes = commonStyles();
  const [txId, setTxId] = useState<string | undefined>(undefined)
  const [addingLiquidity, setAddingLiquidity] = useState<boolean>(false)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()
  const { balance, updateBalanceForTx } = useAvailableBalances()
  const history = useHistory()

  const handleTokenAChange = useCallback((tokenInfo) => {
    dispatch(selectTokenA(tokenInfo))
  }, [dispatch]);

  const handleTokenBChange = useCallback((tokenInfo) => {
    dispatch(selectTokenB(tokenInfo))
  }, [dispatch]);

  const { tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityDetails } = useDerivedMintInfo(setError)

  const handleTokenAAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenA', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const handleTokenBAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenB', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const completed = useMemo(() => txId !== undefined, [txId])

  const redirectToSwap = useCallback(() => {
    dispatch(reset())
    setTxId(undefined)
    setAddingLiquidity(false)
    setError(undefined)
    history.push('/swap')
  }, [history])

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
          disabled={!!addingLiquidity || !!completed}
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
          disabled={!!addingLiquidity || !!completed}
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
      setAddingLiquidity(true)
      if (
        wallet !== undefined &&
        wallet.signer.explorerProvider !== undefined &&
        tokenPairState !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        tokenAAmount !== undefined &&
        tokenBAmount !== undefined
      ) {
        const result = await addLiquidity(
          balance,
          wallet.signer,
          wallet.signer.explorerProvider,
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
        setTxId(result.txId)
        updateBalanceForTx(result.txId)
        setAddingLiquidity(false)
      }
    } catch (error) {
      setError(`${error}`)
      setAddingLiquidity(false)
      console.error(`failed to add liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, tokenAAmount, tokenBAmount, slippage, deadline, balance])

  const readyToAddLiquidity =
    wallet !== undefined &&
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
        <WaitingForTxSubmission
          open={!!addingLiquidity && !completed}
          text="Adding Liquidity"
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
          <Collapse in={!addingLiquidity && !completed && wallet !== undefined}>
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
            <AddLiquidityDetailsCard details={addLiquidityDetails} slippage={slippage === 'auto' ? DEFAULT_SLIPPAGE : slippage}></AddLiquidityDetailsCard>
            {addLiquidityButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

function AddLiquidityDetailsCard({ details, slippage } : { details: AddLiquidityDetails | undefined, slippage: number }) {
  if (details === undefined) {
    return null
  }

  const { state, tokenAId, shareAmount, sharePercentage, amountA, amountB } = details
  const [tokenA, tokenB] = tokenAId === state.token0Info.id
      ? [{ info: state.token0Info, amount: amountA }, { info: state.token1Info, amount: amountB }]
      : [{ info: state.token1Info, amount: amountA }, { info: state.token0Info, amount: amountB }]
  return <Card variant='outlined' style={{ width: '100%', padding: '0', borderRadius: '10px' }}>
    <div style={{ display: 'grid', gridAutoRows: 'auto', gridRowGap: '5px', paddingTop: '10px', paddingBottom: '10px' }}>
      <DetailItem
        itemName='Liquidity token amount:'
        itemValue={`${bigIntToString(shareAmount, PairTokenDecimals)}`}
      />
      <DetailItem
        itemName='Share percentage:'
        itemValue={`${sharePercentage} %`}
      />
      <DetailItem
        itemName={`Minimal amount of ${tokenA.info.symbol} after slippage:`}
        itemValue={`${bigIntToString(minimalAmount(tokenA.amount, slippage), tokenA.info.decimals)} ${tokenA.info.symbol}`}
      />
      <DetailItem
        itemName={`Minimal amount of ${tokenB.info.symbol} after slippage:`}
        itemValue={`${bigIntToString(minimalAmount(tokenB.amount, slippage), tokenB.info.decimals)} ${tokenB.info.symbol}`}
      />
    </div>
  </Card>
}

export default AddLiquidity;
