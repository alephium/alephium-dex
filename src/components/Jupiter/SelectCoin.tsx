import { useMemo, useRef, useState } from "react";
import { ButtonModal } from "../Buttons";
import { useVirtualList } from "ahooks";
import { ChevronDownIcon } from "@heroicons/react/solid";
import defaultCoin from "../../assets/default-coin.png";
import { TokenInfo } from "@alephium/token-list";
import { TokenList } from "../../utils/dex";

const Row = ({
  info,
  handleSelect,
}: {
  info: TokenInfo;
  handleSelect: (e: TokenInfo) => void;
}) => {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-between w-full p-3 cursor-pointer hover:bg-base-300 hover:rounded-md"
    >
      <div
        onClick={() => handleSelect(info)}
        className="flex flex-row items-center w-full h-full"
      >
        <div>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultCoin;
            }}
            src={info.logoURI}
            className="h-[35px] w-[35px]"
          />
        </div>
        <div className="flex flex-col items-start ml-3">
          <span className="font-bold text-md">{info.symbol}</span>
          <span className="text-sm opacity-80">{info.name}</span>
        </div>
      </div>
    </button>
  );
};

const Coin = ({ tokenInfo }: { tokenInfo: TokenInfo }) => {
  return (
    <div className="flex flex-row items-center justify-start">
      <img
        src={tokenInfo?.logoURI}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = defaultCoin;
        }}
        className="h-[25px] w-[25px]"
      />
      <div className="flex flex-row items-center">
        <span className="ml-4 text-lg font-bold text-white">
          {tokenInfo.symbol}
        </span>
        <ChevronDownIcon className="w-[20px] text-grey ml-2" />
      </div>
    </div>
  );
};

export const SelectCoin = ({
  tokenId,
  otherTokenId,
  setCoin
}: {
  tokenId: string | undefined;
  otherTokenId: string | undefined;
  setCoin: any
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const tokenInfo = TokenList.find((tokenInfo) => tokenInfo.id === tokenId)

  const originalList = useMemo(() =>
    TokenList.filter(
      (e) =>
        e.id.includes(search) ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.symbol.toLowerCase().includes(search.toLowerCase())
    ),
    [search, tokenInfo]
  );
  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 70,
    overscan: 10,
  });

  const handleSelect = (e: TokenInfo) => {
    setCoin(e);
    setVisible(false);
  };

  return (
    <ButtonModal
      visible={visible}
      setVisible={setVisible}
      buttonClass="bg-transparent border-0 hover:bg-white hover:bg-opacity-10"
      buttonText={tokenInfo === undefined ? 'select token' : <Coin tokenInfo={tokenInfo} />}
      modalClass="h-screen overflow-clip"
    >
      <input
        value={search || ""}
        onChange={(e) => {
          setSearch(e.target.value.trim());
          scrollTo(0);
        }}
        type="text"
        id="search-token"
        placeholder="Search"
        className="w-full mb-3 text-xs font-bold sm:text-lg input input-bordered input-info"
        spellCheck={false}
      />

      <div className="border-[0.5px] mt-2 border-[#E4E9EE] border-opacity-50" />

      <div
        ref={containerRef}
        className="h-full min-h-[200px] overflow-scroll overscroll-contain"
      >
        <div ref={wrapperRef}>
          {list.filter((t) => t.data.id !== tokenId && t.data.id !== otherTokenId).map((e) => (
            <Row key={e.index} info={e.data} handleSelect={handleSelect} />
          ))}
        </div>
      </div>
    </ButtonModal>
  );
};
