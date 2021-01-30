# On-chain Decentralized Order Book on BSC Testnet

Contract Address : ```0x6D9Bb61b9035C562Fa90cF01e72fE76602c1329a```

Contract Interactor GUI : https://pedantic-ritchie-b4130f.netlify.app/

This contract is a simplified version of Maker On-Chain OTC-Market for ERC-20 compatible tokens available [here.](https://github.com/daifoundation/maker-otc)

### Matching Engine Function Calls

Create Trade Offer : Exchange Token1 (Sell) for Token2 (Buy).

```tradeOffer(address _tokenAddress1, uint _quantity1, address _tokenAddress2, uint _quantity2) returns (uint _id)```

Cancel Offer.

```cancelOffer(uint _id) ```

Create a Token Pair if it doesn't already exist.

```createTokenPair(address _tokenAddress1, address _tokenAddress2) ```


### Matching Engine Algorithm

Orderbooks for buy/sell markets are implemented as two double-linked sorted lists. Match Engine tries to match any new offer with existing offers. If there is no match, the new offer is added to the orderbook. At any point in time, the liquidity of the exchange is directly proportional to number of existing offers in the buy/sell markets.

Let `tSellQuantity` be the amount taker is selling.
Let `tBuyQuantity` is the amount taker is buying.

Let `mSellQuantity` be the amount maker is selling.
Let `mBuyQuantity` is the amount maker is buying.

Check if `(tSellQuantity/tBuyQuantity >= mBuyQuantity/mSellQuantity)` is true. If true, internal function `buy(uint id, uint quantity) ` is called to execute transaction where `quantity` is `min(mSellQuantity,tBuyQuantity)`. `tSellQuantity` and `tBuyQuantity` are updated next. The loop exits if either of these values become zero, otherwise the next iteration is done.

### Contract Interactor GUI Requirements

[Link to the App.](https://pedantic-ritchie-b4130f.netlify.app/)

1. Metamask [Download Link](https://metamask.io/)

2. Connect Metamask To Binance Smart Chain Testnet

```Network Name: Smart Chain - Testnet

New RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/

ChainID: 97

Symbol: BNB

Block Explorer URL: https://testnet.bscscan.com```

3. Get some test BNB from [the faucet.](https://testnet.binance.org/faucet-smart)
