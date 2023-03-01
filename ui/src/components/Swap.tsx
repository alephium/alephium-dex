import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useCallback, useState } from "react";
import ButtonWithLoader from "../components/ButtonWithLoader";
import TokenSelectDialog from "../components/TokenSelectDialog";
import CircleLoader from "../components/CircleLoader";
import HoverIcon from "../components/HoverIcon";
import NumberTextField from "../components/NumberTextField";
import { COLORS } from "../muiTheme";
import { swap, DexTokens } from "../utils/dex";
import { useAlephiumWallet } from "../hooks/useAlephiumWallet";
import { useDeadline } from "../hooks/useDeadline";
import { useSlippageTolerance } from "../hooks/useSlippageTolerance";
import { DEFAULT_SLIPPAGE } from "../state/settings/reducer";
import { useDispatch, useSelector } from 'react-redux'
import { reset, selectTokenIn, selectTokenOut, switchTokens, typeInput } from "../state/swap/actions";
import { useDerivedSwapInfo } from "../state/swap/hooks";
import { selectSwapState } from "../state/swap/selectors";

const useStyles = makeStyles((theme) => ({
  numberField: {
    flexGrow: 1,
    "& > * > .MuiInputBase-input": {
      textAlign: "right",
      height: "100%",
      flexGrow: "1",
      fontSize: "1.5rem",
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
  }
}));

function Swap({ dexTokens }: { dexTokens: DexTokens }) {
  const classes = useStyles();
  const [completed, setCompleted] = useState<boolean>(false)
  const [swapping, setSwapping] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage,] = useSlippageTolerance()
  const [deadline,] = useDeadline()
  const wallet = useAlephiumWallet()

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

  const sourceContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenInInfo?.tokenAddress}
        counterpart={tokenOutInfo?.tokenAddress}
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
  );
  const middleButton = <HoverIcon onClick={switchCallback} />;
  const targetContent = (
    <div className={classes.tokenContainer}>
      <TokenSelectDialog
        dexTokens={dexTokens}
        tokenAddress={tokenOutInfo?.tokenAddress}
        counterpart={tokenInInfo?.tokenAddress}
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
  );

  const handleSwap = useCallback(async () => {
    try {
      setSwapping(true)
      if (
        swapType !== undefined &&
        wallet !== undefined &&
        wallet.signer !== undefined &&
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
          wallet.balances,
          wallet.signer,
          wallet.address,
          tokenPairState.tokenPairId,
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
  }, [wallet, tokenPairState, tokenInInfo, tokenInAmount, tokenOutAmount, slippage, deadline, swapType])

  const readyToSwap =
    wallet !== undefined &&
    wallet.signer !== undefined &&
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
