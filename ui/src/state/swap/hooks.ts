import { useSelector } from 'react-redux'
import { getAmountIn, getAmountOut, TokenPairState, tryBigIntToString, tryStringToBigInt } from '../../utils/dex'
import { selectSwapState } from './selectors'
import { useMemo } from 'react'
import { useTokenPairState } from '../useTokenPairState'

export function useDerivedSwapInfo(setError: (err: string | undefined) => void): {
  tokenInInput: string | undefined,
  tokenOutInput: string | undefined,
  tokenInAmount: bigint | undefined,
  tokenOutAmount: bigint | undefined,
  tokenPairState: TokenPairState | undefined,
  swapType: 'ExactIn' | 'ExactOut' | undefined
} {
  const { lastInput, inputValue, tokenInInfo, tokenOutInfo } = useSelector(selectSwapState)
  const tokenPairState = useTokenPairState(tokenInInfo, tokenOutInfo, setError)

  const [parsedAmount, tokenInfo] = useMemo(() => {
    const tokenInfo = lastInput === 'TokenIn' ? tokenInInfo : tokenOutInfo
    try {
      setError(undefined)
      return [tryStringToBigInt(inputValue, tokenInfo?.decimals), tokenInfo]
    } catch (error) {
      console.log(`Invalid input: ${inputValue}, ${tokenInfo?.decimals}`)
      setError(`${error}`)
      return [undefined, undefined]
    }
  }, [lastInput, tokenInInfo, tokenOutInfo, inputValue, setError])

  const swapType = useMemo(() => {
    return lastInput === undefined ? undefined : lastInput === 'TokenIn' ? 'ExactIn' : 'ExactOut'
  }, [lastInput])

  const swapAmount = useMemo(() => {
    try {
      if (tokenPairState?.reserve0 === 0n) {
        throw new Error('This pool has no liquidity yet, please add liquidity to this pool first')
      }

      setError(undefined)
      return parsedAmount && tokenInfo && tokenPairState && swapType
        ? getSwapAmount(tokenPairState, swapType, parsedAmount, tokenInfo.tokenId)
        : undefined
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return undefined
    }
  }, [tokenPairState, parsedAmount, tokenInfo, setError, swapType])

  const [tokenInInput, tokenOutInput, tokenInAmount, tokenOutAmount] = useMemo(() => {
    try {
      const tokenInInput = lastInput === 'TokenIn' ? inputValue : tryBigIntToString(swapAmount, tokenInInfo?.decimals)
      const tokenOutInput = lastInput === 'TokenOut' ? inputValue : tryBigIntToString(swapAmount, tokenOutInfo?.decimals)
      const tokenInAmount = lastInput === 'TokenIn' ? parsedAmount : swapAmount
      const tokenOutAmount = lastInput === 'TokenOut' ? parsedAmount : swapAmount
      return [tokenInInput, tokenOutInput, tokenInAmount, tokenOutAmount]
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return [undefined, undefined, undefined, undefined]
    }
  }, [lastInput, swapAmount, parsedAmount, inputValue, tokenInInfo, tokenOutInfo, setError])
  return { tokenInInput, tokenOutInput, tokenInAmount, tokenOutAmount, tokenPairState, swapType }
}

function getSwapAmount(state: TokenPairState, swapType: 'ExactIn' | 'ExactOut', amount: bigint, tokenId: string) {
  if (swapType === 'ExactIn') {
    return getAmountOut(state, tokenId, amount)
  } else {
    return getAmountIn(state, tokenId, amount)
  }
}
