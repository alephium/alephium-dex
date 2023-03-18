import { Logo } from "./Logo";
import clsx from "clsx";
import { AlephiumConnectButton } from "@alephium/web3-react";

const TopBar = () => {

  return (
    <div className="relative h-[40px] bg-neutral mb-10">
      <div
        className={clsx("absolute left-4", "top-5")}
      >
        <Logo />
      </div>
      <div
        className={clsx("absolute flex flex-row right-4 top-3 mt-3")}
      >
        <AlephiumConnectButton />
      </div>
    </div>
  );
};

export default TopBar;
