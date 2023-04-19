# Alephium DEX

## Install Alephium Extension Wallet

Download the Extension wallet: [Google Chrome Store](https://chrome.google.com/webstore/detail/alephium-extension-wallet/gdokollfhmnbfckbobkdbakhilldkhcj) or [Firefox Store](https://addons.mozilla.org/en-US/firefox/addon/alephiumextensionwallet/)

## Clone the DEX repo

```
git clone https://github.com/alephium/alephium-dex.git
cd alephium-dex
npm install
```

## Testnet

Build and run the DEX for Testnet:

```
npm run build && npm run start
```

Now you can open the `http://localhost:3000/alephium-dex`, you will see something like this: ![](./images/dex-ui.png)

## Devnet

### Setup local development network

Start a local development network following the instructions [here](https://github.com/alephium/alephium-stack#devnet).

### Compile the contracts

```
npm run compile
```

### Deploy dex contracts to devnet

```
npm run deploy
```

### Create test tokens on devnet

```
npx ts-node scripts/devnet.ts create-tokens -n 5
```

It will create 5 test tokens on devnet, you can also create your own token contracts following [this guide](https://docs.alephium.org/dapps/getting-started).

The output contains all created token contract ids, which will be used when creating token pool in UI.

## UI

Build and run the UI:

### Devnet

```
npm run build:devnet && npm run start:devnet
```

### Testnet

```
npm run build && npm run start
```

Now you can open the `http://localhost:3000/alephium-dex`, you will see something like this: ![](./images/dex-ui.png)

And now you can test the DEX by creating token pool, adding liquidity to the token pool, swapping tokens, and removing liquidity from the token pool.

## Deploy dex contracts to mainnet

```
NODE_URL=https://wallet-v20.mainnet.alephium.org PRIVATE_KEYS=YOUR_PRIVATE_KEY npm run deploy:mainnet
```

Build and run the UI:

```
npm run build:mainnet && npm run start:mainnet
```
