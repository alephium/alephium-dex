import { useSelector } from 'react-redux'
import {
  AddLiquidityDetails,
  getAddLiquidityDetails,
  getInitAddLiquidityDetails,
  TokenPairState,
  tryBigIntToString,
  tryStringToBigInt
} from '../../utils/dex'
import { selectMintState } from './selectors'
import { useMemo } from 'react'
import { useTokenPairState } from '../useTokenPairState'

export function useDerivedMintInfo(setError: (err: string | undefined) => void): {
  tokenAInput: string | undefined,
  tokenBInput: string | undefined,
  tokenAAmount: bigint | undefined,
  tokenBAmount: bigint | undefined,
  tokenPairState: TokenPairState | undefined,
  addLiquidityDetails: AddLiquidityDetails | undefined,
} {
  const { lastInput, inputValue, otherInputValue, tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const { tokenPairState, getTokenPairStateError } = useTokenPairState(tokenAInfo, tokenBInfo)

  const parsedAmount = useMemo(() => {
    const tokenInfo = lastInput === 'TokenA' ? tokenAInfo : tokenBInfo
    try {
      return tryStringToBigInt(inputValue, tokenInfo?.decimals)
    } catch (error) {
      console.log(`Invalid input: ${inputValue}, ${tokenInfo?.decimals}`)
      setError(`${error}`)
      return undefined
    }
  }, [lastInput, tokenAInfo, tokenBInfo, inputValue, setError])

  const otherAmount = useMemo(() => {
    const tokenInfo = lastInput === 'TokenA' ? tokenBInfo : tokenAInfo
    try {
      return tryStringToBigInt(otherInputValue, tokenInfo?.decimals)
    } catch (error) {
      console.log(`Invalid input: ${otherInputValue}, ${tokenInfo?.decimals}`)
      setError(`${error}`)
      return undefined
    }
  }, [otherInputValue, lastInput, tokenAInfo, tokenBInfo, setError])

  const addLiquidityDetails = useMemo(() => {
    try {
      setError(getTokenPairStateError)
      if (tokenAInfo === undefined || tokenBInfo === undefined) {
        return undefined
      }
      const [tokenAId, tokenBId] = lastInput === 'TokenA' ? [tokenAInfo.id, tokenBInfo.id] : [tokenBInfo.id, tokenAInfo.id]
      if (tokenPairState !== undefined && tokenPairState.reserve0 === 0n) {
        return parsedAmount !== undefined && otherAmount !== undefined
          ? { state: tokenPairState, ...getInitAddLiquidityDetails(tokenAId, tokenBId, parsedAmount, otherAmount) }
          : undefined
      }
      return parsedAmount !== undefined && tokenPairState && lastInput
        ? getAddLiquidityDetails(tokenPairState, tokenAId, parsedAmount, lastInput)
        : undefined
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return undefined
    }
  }, [tokenPairState, getTokenPairStateError, lastInput, tokenAInfo, tokenBInfo, parsedAmount, otherAmount, setError])

  return useMemo(() => {
    if (tokenPairState === undefined || tokenPairState.reserve0 === 0n) {
      const [tokenAInput, tokenBInput, tokenAAmount, tokenBAmount] = lastInput === 'TokenA'
        ? [inputValue, otherInputValue, parsedAmount, otherAmount]
        : [otherInputValue, inputValue, otherAmount, parsedAmount]
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityDetails: addLiquidityDetails }
    }

    try {
      const tokenAInput = lastInput === 'TokenA' ? inputValue : tryBigIntToString(addLiquidityDetails?.amountA, tokenAInfo?.decimals)
      const tokenBInput = lastInput === 'TokenB' ? inputValue : tryBigIntToString(addLiquidityDetails?.amountB, tokenBInfo?.decimals)
      const tokenAAmount = lastInput === 'TokenA' ? parsedAmount : addLiquidityDetails?.amountA
      const tokenBAmount = lastInput === 'TokenB' ? parsedAmount : addLiquidityDetails?.amountB
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityDetails: addLiquidityDetails }
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return { tokenAInput: undefined, tokenBInput: undefined, tokenAAmount: undefined, tokenBAmount: undefined, tokenPairState, addLiquidityDetails }
    }
  }, [tokenPairState, lastInput, inputValue, otherInputValue, parsedAmount, otherAmount, addLiquidityDetails, tokenAInfo, tokenBInfo, setError])
}
