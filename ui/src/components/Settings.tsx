import { useState } from 'react'
import { useDeadline } from '../hooks/useDeadline'
import { useSlippageTolerance } from '../hooks/useSlippageTolerance'
import { DEFAULT_DEADLINE_FROM_NOW } from '../state/reducer'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  TextField,
  Box,
  makeStyles,
  Typography,
  InputAdornment
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    width: 380,
    height: 60,
    display: 'flex',
    alignItems: 'center',
  }
}))

const numberRegex = new RegExp('^[0-9]*[.]?[0-9]*$')

function checkNumber(str: string) {
  if (!numberRegex.test(str)) {
    throw new Error(`Invalid number ${str}`)
  }
}

function Settings() {
  const classes = useStyles()
  const [slippageTolerance, setSlippageTolerance] = useSlippageTolerance()

  const [deadline, setDeadline] = useDeadline()

  const [slippageInput, setSlippageInput] = useState('')
  const [slippageError, setSlippageError] = useState<'InvalidInput' | false>(false)

  const [deadlineInput, setDeadlineInput] = useState('')
  const [deadlineError, setDeadlineError] = useState<'InvalidInput' | false>(false)

  function handleSlippageChanged(value: string) {
    setSlippageInput(value)
    setSlippageError(false)

    if (value.length === 0) {
      setSlippageTolerance('auto')
      return
    }

    try {
      checkNumber(value)
      const parsed = Math.floor(Number.parseFloat(value)) // can not large than 50%
      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 50) {
        throw new Error(`Invalid slippage input ${value}`)
      } else {
        setSlippageTolerance(parsed)
      }
    } catch (error) {
      console.log(`Invalid slippage input ${value}`)
      setSlippageError('InvalidInput')
      setSlippageTolerance('auto')
    }
  }

  function handleDeadlineChanged(value: string) {
    setDeadlineInput(value)
    setDeadlineError(false)

    if (value.length === 0) {
      setDeadline(DEFAULT_DEADLINE_FROM_NOW)
      return
    }
    try {
      checkNumber(value)
      const parsed: number = Math.floor(Number.parseFloat(value) * 60) // can not less than 1 minutes
      if (!Number.isInteger(parsed) || parsed < 60 || parsed > THREE_DAYS_IN_SECONDS) {
        throw new Error(`Invalid deadline input ${value}`)
      } else {
        setDeadline(parsed)
      }
    } catch (error) {
      console.log(`Invalid deadline input ${value}`)
      setDeadline(DEFAULT_DEADLINE_FROM_NOW)
      setDeadlineError('InvalidInput')
    }
  }

  const confirmationContent = (
    <>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box display="flex" className={classes.container}>
          <Tooltip title='Your transaction will revert if it is pending for more than this period of time. The default is 0.5%.'>
            <Typography
              variant="subtitle2"
              style={{ marginLeft: '30px' }}
            >
              Slippage tolerance
            </Typography>
          </Tooltip>
          <TextField
            variant='outlined'
            size='small'
            style={{ left: '30px', width: 140 }}
            inputProps={{ style: { height: "20px", 'color': slippageError ? 'red' : '' }}}
            InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
            placeholder='0.10'
            value={
              slippageInput.length > 0
                ? slippageInput
                : slippageTolerance === 'auto'
                ? ''
                : `${slippageTolerance}`
            }
            onChange={(e) => handleSlippageChanged(e.target.value)}
          />
        </Box>
        <Box display="flex" className={classes.container}>
          <Tooltip title='Your transaction will revert if it is pending for more than this period of time.'>
            <Typography
              variant="subtitle2"
              style={{ marginLeft: '80px' }}
            >
              Deadline
            </Typography>
          </Tooltip>
          <TextField
            variant='outlined'
            size='small'
            style={{ left: '50px', width: 140 }}
            inputProps={{ style: { height: "20px", color: deadlineError ? 'red' : '' }}}
            placeholder={`${DEFAULT_DEADLINE_FROM_NOW / 60} minutes`}
            value={
              deadlineInput.length > 0
                ? deadlineInput
                : deadline === DEFAULT_DEADLINE_FROM_NOW
                ? ''
                : (deadline / 60).toString()
            }
            onChange={(e) => handleDeadlineChanged(e.target.value)}
          />
        </Box>
      </DialogContent>
    </>
  );

  return confirmationContent;
}

const THREE_DAYS_IN_SECONDS = 3 * 24 * 60 * 60

export default function TransactionSettings() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <IconButton aria-label='settings' onClick={() => setOpen(true)}>
        <SettingsIcon/>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Settings />
      </Dialog>
    </>
  )
}
