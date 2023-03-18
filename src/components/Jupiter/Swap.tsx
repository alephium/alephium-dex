import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ButtonBorderGradient } from "../Buttons";
import { SelectCoin } from "./SelectCoin";
import { SwitchVerticalIcon } from "@heroicons/react/solid";
import { useLocalStorageState } from "ahooks";
import { Slippage } from "./Slippage";
import { Balance } from "./Balance";
import { toast } from "react-toastify";
import { checkNumber, swap } from "../../utils/dex";
import { useDispatch, useSelector } from "react-redux";
import { useAlephiumWallet, useAvailableBalances } from "../../hooks";
import { reset, selectTokenIn, selectTokenOut, switchTokens, typeInput } from "../../state/swap/actions";
import { selectSwapState } from "../../state/swap/selectors";
import { useDerivedSwapInfo } from "../../state/swap/hooks";
import { Popup } from 'reactjs-popup'

interface ISwapProps {}

const Swap: FunctionComponent<ISwapProps> = (props) => {
  const [completed, setCompleted] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage, setSlippage] = useLocalStorageState("slippage", { defaultValue: 1 });
  const wallet = useAlephiumWallet()
  const availableBalances = useAvailableBalances()
  const deadline = 30 // 30 minutes, TODO: support setting deadline

  const handleTokenInChange = useCallback((tokenInfo) => {
    dispatch(selectTokenIn(tokenInfo))
  }, [dispatch]);

  const handleTokenOutChange = useCallback((tokenInfo) => {
    dispatch(selectTokenOut(tokenInfo))
  }, [dispatch]);

  const { tokenInInfo, tokenOutInfo } = useSelector(selectSwapState)
  const {
    tokenInInput,
    tokenOutInput,
    tokenInAmount,
    tokenOutAmount,
    tokenPairState,
    swapType
  } = useDerivedSwapInfo(setError)

  const handleTokenInAmountChange = useCallback((event) => {
    dispatch(typeInput({ type: 'TokenIn', value: event.target.value }))
  }, [dispatch])

  const setInput = useCallback((input) => {
    dispatch(typeInput({ type: 'TokenIn', value: input }))
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
    setError(undefined)
  }, [dispatch])

  const handleSwap = useCallback(async () => {
    try {
      if (
        swapType !== undefined &&
        wallet !== undefined &&
        tokenPairState !== undefined &&
        tokenInInfo !== undefined &&
        tokenInAmount !== undefined &&
        tokenOutAmount !== undefined
      ) {
        const result = await swap(
          swapType,
          availableBalances,
          wallet.signer,
          wallet.address,
          tokenPairState,
          tokenInInfo,
          tokenInAmount,
          tokenOutAmount,
          slippage,
          deadline
        )
        console.log(`swap succeed, tx id: ${result.txId}`)
        setCompleted(true)
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to swap, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenInInfo, tokenInAmount, tokenOutAmount, slippage, deadline, swapType, availableBalances])

  useEffect(() => {
    if (error !== undefined) {
      toast.error(`${error}`, {
        type: toast.TYPE.ERROR,
        autoClose: 5_000,
      });
    }
  }, [error])

  const readyToSwap =
    wallet !== undefined &&
    tokenInInfo !== undefined &&
    tokenOutInfo !== undefined &&
    tokenInAmount !== undefined &&
    tokenOutAmount !== undefined &&
    swapType !== undefined &&
    !completed && error === undefined

  return (
    <>
      <Popup modal open={!!completed} onClose={handleReset}
        contentStyle={{ width: '20%', borderRadius: '10px', padding: '20px', paddingRight: '35px', backgroundColor: 'white', position: 'relative', marginTop: '350px' }}
      >
        <div style={{ textAlign: 'center', marginTop: "10px", color: 'black' }}>
          The swap transaction has been submitted, please wait for confirmation.
        </div>
        <div style={{ textAlign: 'center', marginTop: "30px", color: 'black' }}>
        <button className="bg-gray-200 hover:bg-opacity-20 btn btn-sm border-0" onClick={handleReset}>
          close
        </button>
        </div>
      </Popup>
      <div className="bg-base-200 sm:w-[450px] w-[95%] rounded-[15px] px-5 pb-10 pt-5 mb-5 sm:mb-0 mt-3 sm:mt-0">
        <div className="relative">
          <Slippage slippage={slippage} setSlippage={setSlippage} />
        </div>
        
        <div className="flex flex-col justify-between mt-10">
          <div className="flex flex-row justify-between">
            <span className="ml-3 font-bold text-white">You pay</span>
            <Balance
              balances={availableBalances}
              token={tokenInInfo}
              setInput={setInput}
            />
          </div>
          <div className="relative w-full p-10 my-5 rounded-lg bg-neutral">
            <input
              value={tokenInInput ?? ''}
              type="text"
              onChange={(e) => checkNumber(handleTokenInAmountChange, e)}
              className="absolute text-xl font-bold text-right bg-transparent right-4 top-4 input focus:outline-0"
              disabled={!!completed}
            />
            <div className="absolute left-4 top-4">
              <SelectCoin
                tokenId={tokenInInfo?.id}
                otherTokenId={tokenOutInfo?.id}
                setCoin={handleTokenInChange}
              />
            </div>
          </div>

          <div className="flex flex-row justify-center w-full my-1">
            <SwitchVerticalIcon
              onClick={switchCallback}
              className="h-[30px] w-[30px] rotate-45 cursor-pointer"
            />
          </div>

          <div className="flex flex-row justify-between mt-5">
            <span className="ml-3 font-bold text-white">You receive</span>
            <Balance
              balances={availableBalances}
              token={tokenOutInfo}
            />
          </div>
          <div className="relative w-full p-10 my-5 rounded-lg bg-neutral">
            <input
              value={tokenOutInput ?? ''}
              type="text"
              onChange={(e) => checkNumber(handleTokenOutAmountChange, e)}
              className="absolute text-xl font-bold text-right bg-transparent right-4 top-4 input focus:outline-0"
              disabled={!!completed}
            />
            <div className="absolute left-4 top-4">
              <SelectCoin
                tokenId={tokenOutInfo?.id}
                otherTokenId={tokenInInfo?.id}
                setCoin={handleTokenOutChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <ButtonBorderGradient
              onClick={handleSwap}
              disabled={!readyToSwap}
              buttonClass="bg-black w-full p-2 uppercase font-bold h-[50px]"
              fromColor="green-400"
              toColor="blue-500"
            >
              { wallet ? 'Swap' : 'Connect Wallet' }
            </ButtonBorderGradient>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
