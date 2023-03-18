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
  const categories = ['Swap', 'AddLiquidity']

  return (
    <Provider store={store}>
      <AlephiumConnectProvider addressGroup={network.groupIndex} network={networkName}>
        <div className="bg-neutral min-h-screen">
          <TopBar />
            <div className="flex justify-center">
              <div className="w-full max-w-md px-2 py-16 sm:px-0">
                <Tab.Group>
                  <Tab.List className="items-center flex space-x-1 rounded-xl p-1">
                    {categories.map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white shadow'
                              : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
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
