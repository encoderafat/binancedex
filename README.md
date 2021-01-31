# On-chain Decentralized Order Book on BSC Testnet

Contract Address : ```0x6D9Bb61b9035C562Fa90cF01e72fE76602c1329a```

Contract Interactor UI : https://pedantic-ritchie-b4130f.netlify.app/

Demo Video : https://drive.google.com/file/d/1g3abxlOEMHsm8GC-wo9eehvej2CFBFhr/view?usp=sharing

Demo Slides : https://docs.google.com/presentation/d/147y8tMA4r2vcOITa05uNndS33Ygv_H2vuhUvhYy4KdY/edit?usp=sharing

This contract is a simplified and heavily modified version of Maker On-Chain OTC-Market for ERC-20 compatible tokens available [here.](https://github.com/daifoundation/maker-otc)

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

Block Explorer URL: https://testnet.bscscan.com
```

3. Get some test BNB from [the faucet.](https://testnet.binance.org/faucet-smart)

4. Get test Tokens from the faucet (Click Faucet on the menu) and start testing the contract.

###  Further Work and TO-DO List

1. The UI is pretty basic. I ran out of time before I could connect event listeners. I will also add a tab to manage orders - cancellation and list of all fulfilled, outstanding and cancelled orders.

2. Sorting linked lists is a major issue given the gas constraints. I have gone with a very simple sort every order solution which has scaling issues especially if you want to run it on mainnet. Maker-OTC's solution is for user to suggest a position in the sorted list where a new order is inserted but this solution has its own issues when the list becomes very large. I am starting work on an off-chain on-chain solution where the "suggestion" of the slot position comes from an off-chain algorithm. 
