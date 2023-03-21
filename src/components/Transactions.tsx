import { Button, Collapse, Link, Typography } from "@material-ui/core";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { getExplorerLink } from "../utils/dex";
import CircleLoader from "./CircleLoader";
import { commonStyles } from "./style";

interface TransactionSubmitProps {
  open: boolean
  txId: string
  buttonText: string
  onClick: () => void
}

export function TransactionSubmit({
  open,
  txId,
  buttonText,
  onClick
}: TransactionSubmitProps) {
  const classes = commonStyles()
  return <Collapse in={open}>
    <>
      <CheckCircleOutlineRoundedIcon
        fontSize={"inherit"}
        className={classes.successIcon}
      />
      <Typography variant='h5'>Transaction Submitted</Typography>
      <div className={classes.spacer} />
      <Link
        target="_blank"
        href={getExplorerLink(txId)}
        rel="noreferrer"
        variant='body2'
      >
        View on Explorer
      </Link>
      <div className={classes.spacer} />
      <Button onClick={onClick} variant="contained" color="primary" size='large'>
        {buttonText}
      </Button>
    </>
  </Collapse>
}

interface WaitingForTxSubmissionProps {
  open: boolean
  text: string
}

export function WaitingForTxSubmission({ open, text } : WaitingForTxSubmissionProps) {
  const classes = commonStyles()
  return <div className={classes.loaderHolder}>
    <Collapse in={open}>
      <div className={classes.loaderHolder}>
        <CircleLoader />
        <div className={classes.spacer} />
        <div className={classes.spacer} />
        <Typography variant="h5">{text}</Typography>
        <div className={classes.spacer} />
      </div>
    </Collapse>
  </div>
}
