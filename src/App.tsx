import { ToastContainer, toast } from "react-toastify";
import TopBar from "./components/navigation-frame/TopBar";
import { Buffer } from "buffer";
import Swap from "./components/Jupiter/Swap";
import { store } from "./state"
import { Provider } from "react-redux"
import "react-toastify/dist/ReactToastify.css";
import { Tab } from '@headlessui/react'

import { AlephiumConnectProvider } from "@alephium/web3-react";
import { network, networkName } from "./utils/consts";
import AddLiquidity from "./components/Jupiter/AddLiquidity";

window.Buffer = Buffer;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const App = () => {
  const categories = ['Swap', 'Pool']

  return (
    <Provider store={store}>
      <AlephiumConnectProvider addressGroup={network.groupIndex} network={networkName}>
        <div className="bg-neutral min-h-screen">
          <TopBar />
          <div className="flex justify-center">
            <div className="w-full max-w-md px-2 py-5 sm:px-0">
              <Tab.Group>
                <div className="flex justify-center">
                  <Tab.List className="items-center flex space-x-1 rounded-xl bg-base-200/40 w-5/6 p-1.5 my-6">
                    {categories.map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-base font-bold leading-5 text-white focus:outline-none',
                            selected
                              ? 'bg-gray-500 bg-opacity-20 shadow'
                              : 'text-slate-500 hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels className="mt-2">
                  <Tab.Panel key={categories[0]}>
                    <div className="flex flex-col bg-neutral">
                      <Swap />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel key={categories[1]}>
                    <div className="flex flex-col bg-neutral">
                      <AddLiquidity />
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </AlephiumConnectProvider>
    </Provider>
  );
};

export default App;
