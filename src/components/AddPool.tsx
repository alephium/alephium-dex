import { Button, Container, Paper, Typography } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { TokenInfo } from "@alephium/token-list"
import { useCallback, useEffect, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import { tokenPairExist, createTokenPair } from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { commonStyles } from "./style";
import TokenSelectDialog from "./TokenSelectDialog";

function AddPool() {
  const commonClasses = commonStyles();
  const [tokenAInfo, setTokenAInfo] = useState<TokenInfo | undefined>(undefined)
  const [tokenBInfo, setTokenBInfo] = useState<TokenInfo | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  useEffect(() => {
    async function checkContractExist() {
      if (tokenAInfo !== undefined && tokenBInfo !== undefined && wallet !== undefined) {
        try {
          const exist = await tokenPairExist(wallet.nodeProvider, tokenAInfo.id, tokenBInfo.id)
          if (exist) setError(`token pair already exist`)
        } catch (err) {
          setError(`${err}`)
        }
      }
    }

    setError(undefined)
    checkContractExist()
  }, [tokenAInfo, tokenBInfo, wallet])

  const handleTokenAChange = useCallback((tokenInfo) => {
    setTokenAInfo(tokenInfo)
  }, [])

  const handleTokenBChange = useCallback((tokenInfo) => {
    setTokenBInfo(tokenInfo)
  }, [])

  const handleReset = useCallback(() => {
    setTokenAInfo(undefined)
    setTokenBInfo(undefined)
    setCompleted(false)
    setError(undefined)
  }, [])

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

  const handleAddPool = useCallback(async () => {
    try {
      if (wallet !== undefined && tokenAInfo !== undefined && tokenBInfo !== undefined) {
        const result = await createTokenPair(
          wallet.signer,
          wallet.address,
          tokenAInfo.id,
          tokenBInfo.id
        )
        console.log(`add pool succeed, tx id: ${result.txId}, token pair id: ${result.tokenPairId}`)
        setCompleted(true)
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to add pool, error: ${error}`)
    }
  }, [wallet, tokenAInfo, tokenBInfo])

  const readyToAddPool =
    wallet !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    !completed && error === undefined
  const addPoolButton = (
    <ButtonWithLoader
      disabled={!readyToAddPool}
      onClick={handleAddPool}
      className={
        commonClasses.gradientButton + (!readyToAddPool ? " " + commonClasses.disabled : "")
      }
    >
      Add Pool
    </ButtonWithLoader>
  );

  return (
    <Container className={commonClasses.centeredContainer} maxWidth="sm">
      <div className={commonClasses.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Add Pool
      </Typography>
      <div className={commonClasses.spacer} />
      <Paper className={commonClasses.mainPaper}>
        <Collapse in={!!completed}>
          <>
            <CheckCircleOutlineRoundedIcon
              fontSize={"inherit"}
              className={commonClasses.successIcon}
            />
            <Typography>The pool creation transaction has been submitted, please wait for confirmation.</Typography>
            <div className={commonClasses.spacer} />
            <div className={commonClasses.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Add More Pools!
            </Button>
          </>
        </Collapse>
        <div>
          <Collapse in={!completed}>
            {
              <>
                {tokenPairContent}
                <div className={commonClasses.spacer} />
                {error ? (
                  <Typography variant="body2" color="error" className={commonClasses.error}>
                    {error}
                  </Typography>
                ) : null}
                <div className={commonClasses.spacer} />
              </>
            }
            {addPoolButton}
          </Collapse>
        </div>
      </Paper>
      <div className={commonClasses.spacer} />
    </Container>
  );
}

export default AddPool;
