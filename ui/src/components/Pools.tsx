import { Container, Paper, Typography, Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useState, useCallback, useEffect, useMemo } from "react";
import { bigIntToString, PairTokenDecimals } from "../utils/dex";
import { commonStyles } from "./style";
import { TokenInfo } from "@alephium/token-list";
import { useTokenPairState } from "../state/useTokenPairState";
import TokenSelectDialog from "./TokenSelectDialog";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { CopyToClipboard } from 'react-copy-to-clipboard'

function shortContractId(id: string): string {
  return id.slice(0, 6) + '...' + id.slice(-6)
}

function Pool() {
  const commonClasses = commonStyles()
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const { tokenPairState, getTokenPairStateError } = useTokenPairState(tokenAInfo, tokenBInfo)
  const wallet = useAlephiumWallet()

  useEffect(() => {
    if (wallet === undefined) {
      setError('Wallet is not connected')
    } else {
      setError(undefined)
    }
  }, [wallet])

  const handleTokenAChange = useCallback((tokenInfo) => {
    setTokenAInfo(tokenInfo)
  }, [])

  const handleTokenBChange = useCallback((tokenInfo) => {
    setTokenBInfo(tokenInfo)
  }, [])

  const tokenInfo = useMemo(() => {
    return <>
      {tokenPairState ? (
        <>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>Token Pair Id:</p>
          <p className={commonClasses.rightAlign}>
            <CopyToClipboard text={tokenPairState.tokenPairId}>
              <Button style={{ background: 'transparent', height: '15px' }}>
                <span style={{ fontSize: "15px", fontFamily: "monospace" }}>{shortContractId(tokenPairState.tokenPairId)}</span>
              </Button>
            </CopyToClipboard>
          </p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{tokenPairState.token0Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve0, tokenPairState.token0Info.decimals)}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>{tokenPairState.token1Info.name} Reserve:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.reserve1, tokenPairState.token1Info.decimals)}</p>
        </div>
        <div className={commonClasses.notification}>
          <p className={commonClasses.leftAlign}>Total Supply:</p>
          <p className={commonClasses.rightAlign}>{bigIntToString(tokenPairState.totalSupply, PairTokenDecimals)}</p>
        </div>
        </>
      ) : null}
    </>
  }, [tokenPairState, commonClasses])

  const tokenPairContent = (
    <div className={commonClasses.tokenPairContainer}>
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

  return (
    <Container className={commonClasses.centeredContainer} maxWidth="sm">
      <div className={commonClasses.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Pool
      </Typography>
      <div className={commonClasses.spacer} />
      <Paper className={commonClasses.mainPaper}>
        <div>
          <Collapse in={true}>
            {
              <>
                {tokenPairContent}
                <div className={commonClasses.spacer} />
                {error ? (
                  <Typography variant="body2" color="error" className={commonClasses.error}>
                    {error}
                  </Typography>
                ) : getTokenPairStateError ? (
                  (
                    <Typography variant="body2" color="error" className={commonClasses.error}>
                      {getTokenPairStateError}
                    </Typography>
                  )
                ) : tokenInfo}
                <div className={commonClasses.spacer} />
              </>
            }
          </Collapse>
        </div>
      </Paper>
      <div className={commonClasses.spacer} />
    </Container>
  );
}

export default Pool;
