import { useSelector } from 'react-redux'
import {
  AddLiquidityResult,
  getAddLiquidityResult,
  getInitAddLiquidityResult,
  TokenPairState,
  tryBigIntToString,
  tryStringToBigInt,
  TokenInfo
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
  addLiquidityResult: AddLiquidityResult | undefined,
} {
  const { lastInput, inputValue, otherInputValue, tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const tokenPairState = useTokenPairState(tokenAInfo, tokenBInfo, setError)

  const parsedAmount = useMemo(() => {
    const tokenInfo = lastInput === 'TokenA' ? tokenAInfo : tokenBInfo
    try {
      setError(undefined)
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

  const addLiquidityResult = useMemo(() => {
    try {
      if (!tokenPairMatch(tokenPairState, tokenAInfo, tokenBInfo)) {
        return undefined
      }
      if (tokenPairState !== undefined && tokenPairState.reserve0 === 0n) {
        return parsedAmount && otherAmount ? getInitAddLiquidityResult(parsedAmount, otherAmount) : undefined
      }
      const tokenInfo = lastInput === 'TokenA' ? tokenAInfo : tokenBInfo
      return tokenInfo && parsedAmount && tokenPairState && lastInput
        ? getAddLiquidityResult(tokenPairState, tokenInfo.tokenId, parsedAmount, lastInput)
        : undefined
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return undefined
    }
  }, [tokenPairState, lastInput, tokenAInfo, tokenBInfo, parsedAmount, otherAmount, setError])

  return useMemo(() => {
    if (tokenPairState === undefined || tokenPairState.reserve0 === 0n) {
      const [tokenAInput, tokenBInput, tokenAAmount, tokenBAmount] = lastInput === 'TokenA'
        ? [inputValue, otherInputValue, parsedAmount, otherAmount]
        : [otherInputValue, inputValue, otherAmount, parsedAmount]
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult }
    }

    try {
      const tokenAInput = lastInput === 'TokenA' ? inputValue : tryBigIntToString(addLiquidityResult?.amountA, tokenAInfo?.decimals)
      const tokenBInput = lastInput === 'TokenB' ? inputValue : tryBigIntToString(addLiquidityResult?.amountB, tokenBInfo?.decimals)
      const tokenAAmount = lastInput === 'TokenA' ? parsedAmount : addLiquidityResult?.amountA
      const tokenBAmount = lastInput === 'TokenB' ? parsedAmount : addLiquidityResult?.amountB
      return { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult }
    } catch (error) {
      console.log(`${error}`)
      setError(`${error}`)
      return { tokenAInput: undefined, tokenBInput: undefined, tokenAAmount: undefined, tokenBAmount: undefined, tokenPairState, addLiquidityResult }
    }
  }, [tokenPairState, lastInput, inputValue, otherInputValue, parsedAmount, otherAmount, addLiquidityResult, tokenAInfo, tokenBInfo, setError])
}

function tokenPairMatch(tokenPairState: TokenPairState | undefined, token0Info: TokenInfo | undefined, token1Info: TokenInfo | undefined) {
  return (tokenPairState?.token0Info.tokenId === token0Info?.tokenId || tokenPairState?.token1Info.tokenId === token1Info?.tokenId) ||
    (tokenPairState?.token1Info.tokenId === token0Info?.tokenId && tokenPairState?.token0Info.tokenId === token1Info?.tokenId)
}
