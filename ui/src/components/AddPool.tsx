import {
  TextField,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useEffect, useState } from "react";
import ButtonWithLoader from "./ButtonWithLoader";
import CircleLoader from "./CircleLoader";
import { COLORS } from "../muiTheme";
import { tokenPairExist, createTokenPair, checkContractId } from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";

const useStyles = makeStyles((theme) => ({
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
      },
    },
    "& > * > input::-webkit-inner-spin-button": {
      webkitAppearance: "none",
      margin: "0",
    },
  },
  tokenContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "3px solid #333333",
    padding: ".6rem",
    borderRadius: "10px",
    "& > *": {
      margin: ".1rem",
    },
    margin: ".5rem 0rem .5rem 0rem",
    height: "60px"
  },
  centeredContainer: {
    textAlign: "center",
    width: "100%",
  },
  spacer: {
    height: "1rem",
  },
  mainPaper: {
    padding: "2rem",
    backgroundColor: COLORS.nearBlackWithMinorTransparency,
  },
  titleBar: {
    marginTop: "10rem",
    "& > *": {
      margin: ".5rem",
      alignSelf: "flex-end",
    },
  },
  gradientButton: {
    backgroundImage: `linear-gradient(45deg, ${COLORS.blue} 0%, ${COLORS.nearBlack}20 50%,  ${COLORS.blue}30 62%, ${COLORS.nearBlack}50  120%)`,
    transition: "0.75s",
    backgroundSize: "200% auto",
    boxShadow: "0 0 20px #222",
    "&:hover": {
      backgroundPosition:
        "right center" /* change the direction of the change here */,
    },
    width: "100%",
    height: "3rem",
    marginTop: "1rem",
  },
  disabled: {
    background: COLORS.gray,
  },
  loaderHolder: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  successIcon: {
    color: COLORS.green,
    fontSize: "200px",
  },
  error: {
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
}));

function AddPool() {
  const classes = useStyles();
  const [tokenAId, setTokenAId] = useState<string | undefined>(undefined)
  const [tokenBId, setTokenBId] = useState<string | undefined>(undefined)
  const [completed, setCompleted] = useState<boolean>(false)
  const [addingPool, setAddingPool] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  useEffect(() => {
    if (tokenAId !== undefined && tokenBId !== undefined) {
      if (tokenAId === tokenBId) {
        setError('identical token ids')
        return
      }

      tokenPairExist(tokenAId, tokenBId)
        .then((exist) => {
          if (exist) setError(`token pair already exist`)
        })
        .catch((err) => setError(err))
    }
  }, [tokenAId, tokenBId])

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
    <div className={classes.tokenContainer}>
      <TextField
        multiline
        className={classes.textField}
        value={tokenAId !== undefined ? tokenAId : ''}
        onChange={handleTokenAChange}
        autoFocus={true}
        InputProps={{ disableUnderline: true }}
        disabled={!!addingPool || !!completed}
      />
    </div>
  );
  const targetContent = (
    <div className={classes.tokenContainer}>
      <TextField
        multiline
        className={classes.textField}
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
      if (
        wallet !== undefined &&
        wallet.signer !== undefined &&
        tokenAId !== undefined &&
        tokenBId !== undefined
      ) {
        const result = await createTokenPair(
          wallet.signer,
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
    wallet.signer !== undefined &&
    tokenAId !== undefined &&
    tokenBId !== undefined &&
    !addingPool && !completed && 
    error === undefined
  const addPoolButton = (
    <ButtonWithLoader
      disabled={!readyToAddPool}
      onClick={handleAddPool}
      className={
        classes.gradientButton + (!readyToAddPool ? " " + classes.disabled : "")
      }
    >
      Add Pool
    </ButtonWithLoader>
  );

  return (
    <Container className={classes.centeredContainer} maxWidth="sm">
      <div className={classes.titleBar}></div>
      <Typography variant="h4" color="textSecondary">
        Add Pool
      </Typography>
      <div className={classes.spacer} />
      <Paper className={classes.mainPaper}>
        <Collapse in={!!completed}>
          <>
            <CheckCircleOutlineRoundedIcon
              fontSize={"inherit"}
              className={classes.successIcon}
            />
            <Typography>Add pool succeed!</Typography>
            <div className={classes.spacer} />
            <div className={classes.spacer} />
            <Button onClick={handleReset} variant="contained" color="primary">
              Add More Pools!
            </Button>
          </>
        </Collapse>
        <div className={classes.loaderHolder}>
          <Collapse in={!!addingPool && !completed}>
            <div className={classes.loaderHolder}>
              <CircleLoader />
              <div className={classes.spacer} />
              <div className={classes.spacer} />
              <Typography variant="h5">
                Adding pool...
              </Typography>
              <div className={classes.spacer} />
            </div>
          </Collapse>
        </div>
        <div>
          <Collapse in={!addingPool && !completed}>
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
            {addPoolButton}
          </Collapse>
        </div>
      </Paper>
      <div className={classes.spacer} />
    </Container>
  );
}

export default AddPool;
