import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { ButtonBorderGradient } from "../Buttons";
import { SelectCoin } from "./SelectCoin";
import { useLocalStorageState } from "ahooks";
import { Slippage } from "./Slippage";
import { Balance } from "./Balance";
import { toast } from "react-toastify";
import { addLiquidity, checkNumber } from "../../utils/dex";
import { useDispatch, useSelector } from "react-redux";
import { useAlephiumWallet, useAvailableBalances } from "../../hooks";
import { Popup } from 'reactjs-popup'
import { selectMintState } from "../../state/mint/selectors";
import { reset, selectTokenA, selectTokenB, typeInput } from "../../state/mint/actions";
import { useDerivedMintInfo } from "../../state/mint/hooks";

interface IAddLiquidityProps {}

const AddLiquidity: FunctionComponent<IAddLiquidityProps> = (props) => {
  const [completed, setCompleted] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [error, setError] = useState<string | undefined>(undefined)
  const [slippage, setSlippage] = useLocalStorageState("slippage", { defaultValue: 1 });
  const wallet = useAlephiumWallet()
  const availableBalances = useAvailableBalances()
  const deadline = 30 // 30 minutes, TODO: support setting deadline

  const handleTokenAChange = useCallback((tokenInfo) => {
    dispatch(selectTokenA(tokenInfo))
  }, [dispatch]);

  const handleTokenBChange = useCallback((tokenInfo) => {
    dispatch(selectTokenB(tokenInfo))
  }, [dispatch]);

  const { tokenAInfo, tokenBInfo } = useSelector(selectMintState)
  const { tokenAInput, tokenBInput, tokenAAmount, tokenBAmount, tokenPairState, addLiquidityResult } = useDerivedMintInfo(setError)

  const handleTokenAAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenA', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const setTokenAInput = useCallback((input) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenA', value: input, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const handleTokenBAmountChange = useCallback((event) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenB', value: event.target.value, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const setTokenBInput = useCallback((input) => {
    const hasLiquidity = tokenPairState !== undefined && tokenPairState.reserve0 > 0n
    dispatch(typeInput({ type: 'TokenB', value: input, hasLiquidity }))
  }, [dispatch, tokenPairState])

  const handleReset = useCallback(() => {
    dispatch(reset())
    setCompleted(false)
    setError(undefined)
  }, [dispatch])

  const handleAddLiquidity = useCallback(async () => {
    try {
      if (
        wallet !== undefined &&
        tokenPairState !== undefined &&
        tokenAInfo !== undefined &&
        tokenBInfo !== undefined &&
        tokenAAmount !== undefined &&
        tokenBAmount !== undefined
      ) {
        const result = await addLiquidity(
          availableBalances,
          wallet.signer,
          wallet.address,
          tokenPairState,
          tokenAInfo,
          tokenBInfo,
          tokenAAmount,
          tokenBAmount,
          slippage,
          deadline
        )
        console.log(`add liquidity succeed, tx id: ${result.txId}`)
        setCompleted(true)
      }
    } catch (error) {
      setError(`${error}`)
      console.error(`failed to add liquidity, error: ${error}`)
    }
  }, [wallet, tokenPairState, tokenAInfo, tokenBInfo, tokenAAmount, tokenBAmount, slippage, deadline, availableBalances])

  useEffect(() => {
    if (error !== undefined) {
      toast.error(`${error}`, {
        type: toast.TYPE.ERROR,
        autoClose: 5_000,
      });
    }
  }, [error])

  const readyToAddLiquidity =
    wallet !== undefined &&
    tokenAInfo !== undefined &&
    tokenBInfo !== undefined &&
    tokenAAmount !== undefined &&
    tokenBAmount !== undefined &&
    !completed && error === undefined

  return (
    <>
      <Popup modal open={!!completed} onClose={handleReset} position={'center center'}
        contentStyle={{ width: '20%', borderRadius: '10px', padding: '20px', paddingRight: '35px', backgroundColor: 'white', position: 'relative', marginTop: '350px' }}
      >
        <div style={{ textAlign: 'center', marginTop: "10px", color: 'black' }}>
          The add liquidity transaction has been submitted, please wait for confirmation.
        </div>
        <div style={{ textAlign: 'center', marginTop: "30px", color: 'black' }}>
        <button className="bg-gray-200 hover:bg-opacity-20 btn btn-sm border-0" onClick={handleReset}>
          close
        </button>
        </div>
      </Popup>
      <div className="bg-base-200 sm:w-[450px] w-[95%] rounded-[15px] px-5 pb-10 pt-5 mb-5 sm:mb-0 mt-3 sm:mt-0">
        <div className="flex flex-col justify-between mt-10">
          <div className="flex flex-row justify-between">
            <span className="ml-3 font-bold text-white"></span>
            <Balance
              balances={availableBalances}
              token={tokenAInfo}
              setInput={setTokenAInput}
            />
          </div>
          <div className="relative w-full p-10 my-5 rounded-lg bg-neutral">
            <input
              value={tokenAInput ?? ''}
              type="text"
              onChange={(e) => checkNumber(handleTokenAAmountChange, e)}
              className="absolute text-xl font-bold text-right bg-transparent right-4 top-4 input focus:outline-0"
              disabled={!!completed}
            />
            <div className="absolute left-4 top-4">
              <SelectCoin
                tokenId={tokenAInfo?.id}
                otherTokenId={tokenBInfo?.id}
                setCoin={handleTokenAChange}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between mt-5">
            <span className="ml-3 font-bold text-white"></span>
            <Balance
              balances={availableBalances}
              token={tokenBInfo}
              setInput={setTokenBInput}
            />
          </div>
          <div className="relative w-full p-10 my-5 rounded-lg bg-neutral">
            <input
              value={tokenBInput ?? ''}
              type="text"
              onChange={(e) => checkNumber(handleTokenBAmountChange, e)}
              className="absolute text-xl font-bold text-right bg-transparent right-4 top-4 input focus:outline-0"
              disabled={!!completed}
            />
            <div className="absolute left-4 top-4">
              <SelectCoin
                tokenId={tokenBInfo?.id}
                otherTokenId={tokenAInfo?.id}
                setCoin={handleTokenBChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <ButtonBorderGradient
              onClick={handleAddLiquidity}
              disabled={!readyToAddLiquidity}
              buttonClass="bg-black w-full p-2 uppercase font-bold h-[50px]"
              fromColor="green-400"
              toColor="blue-500"
            >
              { wallet ? 'Add Liquidity' : 'Connect Wallet' }
            </ButtonBorderGradient>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLiquidity;
