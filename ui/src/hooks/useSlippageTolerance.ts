import { useSelector, useDispatch } from 'react-redux'
import { useMemo, useCallback } from 'react'
import { selectSlippageTolerance } from '../state/settings/selectors'
import { updateSlippageTolerance } from '../state/settings/reducer'

export function useSlippageTolerance(): [number | 'auto', (slippageTolerance: number | 'auto') => void] {
  const slippageTolerance = useSelector(selectSlippageTolerance)

  const dispatch = useDispatch()
  const setSlippageTolerance = useCallback(
    (slippageTolerance: number | 'auto') => {
      dispatch(updateSlippageTolerance({slippageTolerance}))
    },
    [dispatch]
  )

  return useMemo(
    () => [slippageTolerance, setSlippageTolerance],
    [slippageTolerance, setSlippageTolerance]
  )
}

export function useSlippageToleranceWithDefault(defaultSlippageTolerance: number): number {
  const [slippageTolerance,] = useSlippageTolerance()
  return useMemo(
    () => (slippageTolerance === 'auto' ? defaultSlippageTolerance : slippageTolerance),
    [slippageTolerance, defaultSlippageTolerance]
  )
}
