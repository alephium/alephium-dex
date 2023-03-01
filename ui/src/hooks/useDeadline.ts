import { useSelector, useDispatch } from 'react-redux'
import { selectDeadline } from '../state/settings/selectors'
import { useCallback } from 'react'
import { updateDeadline } from '../state/settings/reducer'

export function useDeadline(): [number, (slippage: number) => void] {
  const dispatch = useDispatch()
  const deadline = useSelector(selectDeadline)

  const setDeadline = useCallback(
    (deadline: number) => {
      dispatch(updateDeadline({deadline}))
    },
    [dispatch]
  )

  return [deadline, setDeadline]
}
