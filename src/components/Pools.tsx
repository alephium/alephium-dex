import { Container, Paper, Typography, Card } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useState, useCallback } from "react";
import { bigIntToString, PairTokenDecimals, TokenPairState } from "../utils/dex";
import { commonStyles } from "./style";
import { TokenInfo } from "@alephium/token-list";
import { useTokenPairState } from "../state/useTokenPairState";
import TokenSelectDialog from "./TokenSelectDialog";
import { useAlephiumWallet, useAvailableBalances } from "../hooks/useAlephiumWallet";
import { DetailItem } from "./DetailsItem";
import BigNumber from "bignumber.js";

function Pool() {
  const commonClasses = commonStyles()
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const { tokenPairState, getTokenPairStateError } = useTokenPairState(tokenAInfo, tokenBInfo)
  const wallet = useAlephiumWallet()
  const balance = useAvailableBalances()

  const handleTokenAChange = useCallback((tokenInfo) => {
    setTokenAInfo(tokenInfo)
  }, [])

  const handleTokenBChange = useCallback((tokenInfo) => {
    setTokenBInfo(tokenInfo)
  }, [])

  const tokenPairContent = (
    <div className={commonClasses.tokenPairContainer}>
      <TokenSelectDialog
        tokenId={tokenAInfo?.id}
        counterpart={tokenBInfo?.id}
        onChange={handleTokenAChange}
        tokenBalances={balance}
        mediumSize={true}
      />
      <TokenSelectDialog
        tokenId={tokenBInfo?.id}
        counterpart={tokenAInfo?.id}
        onChange={handleTokenBChange}
        tokenBalances={balance}
        mediumSize={true}
      />
    </div>
  )

  return (
    <Container className={commonClasses.centeredContainer} maxWidth="sm">
      <div className={commonClasses.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Pool
      </Typography>
      <div className={commonClasses.spacer} />
      <Paper className={commonClasses.mainPaper}>
        <div>
          {wallet === undefined ?
            <div>
              <Typography variant="h6" color="error" className={commonClasses.error}>
                Your wallet is not connected
              </Typography>
            </div> : null
          }
          <Collapse in={wallet !== undefined}>
            {
              <>
                {tokenPairContent}
                <div className={commonClasses.spacer} />
                <div className={commonClasses.spacer} />
                {getTokenPairStateError ? (
                  (
                    <Typography variant="body2" color="error" className={commonClasses.error}>
                      {getTokenPairStateError}
                    </Typography>
                  )
                ) : <PoolDetailsCard state={tokenPairState} balance={balance} />}
              </>
            }
          </Collapse>
        </div>
      </Paper>
    </Container>
  );
}

function PoolDetailsCard({ state, balance } : { state: TokenPairState | undefined, balance: Map<string, bigint> }) {
  if (state === undefined) {
    return null
  }

  const poolTokenBalance = balance.get(state.tokenPairId) ?? 0n
  const sharePecentage = BigNumber((poolTokenBalance * 100n).toString()).div(BigNumber(state.totalSupply.toString())).toFixed(5)
  return <Card variant='outlined' style={{ width: '100%', padding: '0', borderRadius: '10px' }}>
    <div style={{ display: 'grid', gridAutoRows: 'auto', gridRowGap: '5px', paddingTop: '10px', paddingBottom: '10px' }}>
      <DetailItem
        itemName={`Pooled ${state.token0Info.symbol}:`}
        itemValue={`${bigIntToString(state.reserve0, state.token0Info.decimals)} ${state.token0Info.symbol}`}
      />
      <DetailItem
        itemName={`Pooled ${state.token1Info.symbol}:`}
        itemValue={`${bigIntToString(state.reserve1, state.token1Info.decimals)} ${state.token1Info.symbol}`}
      />
      <DetailItem
        itemName={'Liquidity token total supply:'}
        itemValue={`${bigIntToString(state.totalSupply, PairTokenDecimals)}`}
      />
      <DetailItem
        itemName={'Your total pool tokens:'}
        itemValue={`${bigIntToString(poolTokenBalance, PairTokenDecimals)}`}
      />
      <DetailItem
        itemName={'Your pool share:'}
        itemValue={state.totalSupply === 0n ? '0 %' : `${parseFloat(sharePecentage)} %`}
      />
    </div>
  </Card>
}

export default Pool;
