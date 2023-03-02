import { TextField, Button, Container, Paper, Typography, makeStyles } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useEffect, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import CircleLoader from "./CircleLoader";
import { tokenPairExist, createTokenPair, checkContractId } from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { commonStyles } from "./style";

export const useStyles = makeStyles(() => ({
  textField: {
    flexGrow: 1,
    "& > * > .MuiInputBase-input": {
      textAlign: "right",
      height: "100%",
      flexGrow: "1",
      fontSize: "1.2rem",
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
}))

function AddPool() {
  const commonClasses = commonStyles();
  const classes = useStyles();
  const [tokenAId, setTokenAId] = useState<string | undefined>(undefined)
  const [tokenBId, setTokenBId] = useState<string | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [addingPool, setAddingPool] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  useEffect(() => {
    if (tokenAId !== undefined && tokenBId !== undefined && wallet !== undefined) {
      if (tokenAId === tokenBId) {
        setError('identical token ids')
        return
      }

      tokenPairExist(wallet.nodeProvider, tokenAId, tokenBId)
        .then((exist) => {
          if (exist) setError(`token pair already exist`)
        })
        .catch((err) => setError(err))
    }
  }, [tokenAId, tokenBId, wallet])

  const handleTokenAChange = useCallback(
    (event) => {
      setError(undefined)
      if (event.target.value === '') {
        setTokenAId(undefined)
        return
      }
      setTokenAId(event.target.value)
      try {
        checkContractId(event.target.value)
      } catch (error) {
        setError(`${error}`)
        console.log(`handleTokenAChange error: ${error}`)
      }
    }, []
  )

  const handleTokenBChange = useCallback(
    (event) => {
      setError(undefined)
      if (event.target.value === '') {
        setTokenBId(undefined)
        return
      }
      setTokenBId(event.target.value)
      try {
        checkContractId(event.target.value)
      } catch (error) {
        setError(`${error}`)
        console.log(`handleTokenBChange error: ${error}`)
      }
    }, []
  )

  const handleReset = useCallback(() => {
    setTokenAId(undefined)
    setTokenBId(undefined)
    setCompleted(false)
    setAddingPool(false)
    setError(undefined)
  }, [])

  const sourceContent = (
    <div className={commonClasses.tokenContainer}>
      <TextField
        multiline
        className={classes.textField}
        style={{ fontSize: '1.2 rem' }}
        value={tokenAId !== undefined ? tokenAId : ''}
        onChange={handleTokenAChange}
        autoFocus={true}
        InputProps={{ disableUnderline: true }}
        disabled={!!addingPool || !!completed}
      />
    </div>
  );
  const targetContent = (
    <div className={commonClasses.tokenContainer}>
      <TextField
        multiline
        className={classes.textField}
        style={{ fontSize: '1.2 rem' }}
        value={tokenBId !== undefined ? tokenBId : ''}
        onChange={handleTokenBChange}
        InputProps={{ disableUnderline: true }}
        disabled={!!addingPool || !!completed}
      />
    </div>
  );

  const handleAddPool = useCallback(async () => {
    try {
      setAddingPool(true)
      if (wallet !== undefined && tokenAId !== undefined && tokenBId !== undefined) {
        const result = await createTokenPair(
          wallet.signer,
          wallet.nodeProvider,
          wallet.address,
          tokenAId,
          tokenBId
        )
        console.log(`add pool succeed, tx id: ${result.txId}, token pair id: ${result.tokenPairId}`)
        setCompleted(true)
        setAddingPool(false)
      }
    } catch (error) {
      setError(`${error}`)
      setAddingPool(false)
      console.error(`failed to add pool, error: ${error}`)
    }
  }, [wallet, tokenAId, tokenBId])

  const readyToAddPool =
    wallet !== undefined &&
    tokenAId !== undefined &&
    tokenBId !== undefined &&
    !addingPool && !completed && 
    error === undefined
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
            <Typography>Add pool succeed!</Typography>
            <div className={commonClasses.spacer} />
            <div className={commonClasses.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Add More Pools!
            </Button>
          </>
        </Collapse>
        <div className={commonClasses.loaderHolder}>
          <Collapse in={!!addingPool && !completed}>
            <div className={commonClasses.loaderHolder}>
              <CircleLoader />
              <div className={commonClasses.spacer} />
              <div className={commonClasses.spacer} />
              <Typography variant="h5">
                Adding pool...
              </Typography>
              <div className={commonClasses.spacer} />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse in={!addingPool && !completed}>
            {
              <>
                {sourceContent}
                <div className={commonClasses.spacer} />
                {targetContent}
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
