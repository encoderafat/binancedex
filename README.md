# On-chain Decentralized Order Book on BSC Testnet

Contract Address : ```0x6D9Bb61b9035C562Fa90cF01e72fE76602c1329a```

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

Let tSellAmount be the amount taker is selling.
Let tBuyAmount is the amount taker is buying.

Let mSellAmount be the amount maker is selling.
Let mBuyAmount is the amount maker is buying.

Check if (tSellAmount/tBuyAmount >= mBuyAmount/mSellAmount) is true.

