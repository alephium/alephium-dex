import { TokenInfo } from "@alephium/token-list";
import { bigIntToString } from "../../utils/dex";

export const Balance = ({
  token,
  balances,
  setInput
}: {
  token: TokenInfo | undefined;
  balances: Map<string, bigint>;
  setInput?: (value: React.SetStateAction<string>) => void;
}) => {

  if (token === undefined) {
    return null
  }
  const amount = balances.get(token.id) ?? 0n
  const amountStr = bigIntToString(amount, token.decimals)

  return (
    <div className="flex flex-row items-center mr-1">
      <span className="mr-1 text-sm font-bold text-white">Balance: </span>
      <span className="mr-1 text-sm font-bold text-white opacity-40">
        {" "}
        {amountStr}
      </span>

      {setInput && (
        <>
          <div
            onClick={() => setInput(bigIntToString(amount / 2n, token.decimals).replace(',', ''))}
            className="border-[2px] border-solid rounded-[20px] border-sky-500 w-[50px] text-center text-xs cursor-pointer uppercase font-bold mr-1"
          >
            Half
          </div>
          <div
            onClick={() => setInput(bigIntToString(amount, token.decimals).replace(',', ''))}
            className="border-[2px] border-solid rounded-[20px] border-sky-500 w-[50px] text-center text-xs cursor-pointer uppercase font-bold"
          >
            Max
          </div>
        </>
      )}
    </div>
  );
};
