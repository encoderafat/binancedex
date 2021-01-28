var RTOK = artifacts.require("./RTOK.sol");
var DEX = artifacts.require("./DEX.sol");

contract("Deposit and Withdraw Currency", async accounts => {
    it("Deposit and Withdraw Token", async () => {
        let instance = await RTOK.deployed();
        const tokenAddress = instance.address;
        //console.log(tokenAddress);
        let exchange = await DEX.deployed();
        const exchangeAddress = exchange.address;

        // Add Token to exchange

        let txTokenAdded = await exchange.addToken(tokenAddress,"RTOKEN","RTOK", {from: accounts[0]});
        assert.equal(txTokenAdded.logs[0].event,"TokenAdded","TokenAdded Event Emit Failure");

        let initialBalance = await exchange.getTokenBalance(tokenAddress);
        //console.log("Initial balance",initialBalance.toString());

        //Deposit 100 Tokens in the exchange
        let tokenAmount = "100000000000000000000";

        await instance.approve(exchangeAddress,tokenAmount);

        let txDeposit = await exchange.depositToken(tokenAddress,tokenAmount);
        assert.equal(txDeposit.logs[0].event,"TokenDeposited","TokenDeposited Event Emit Failure");

        let interimBalance = await exchange.getTokenBalance(tokenAddress);
        //console.log("Interim balance",interimBalance.toString());
        assert.equal("100000000000000000000",interimBalance.toString(),"Post Deposit Token Balance should be 1000000000000000000");

        let withdrawalAmount = "50000000000000000000";

        let txWithdraw = await exchange.withdrawToken(tokenAddress,withdrawalAmount);
        assert.equal(txWithdraw.logs[0].event,"TokenWithdrawn","TokenWithdrawn Event Emit Failure");

        let finalBalance = await exchange.getTokenBalance(tokenAddress);
        //console.log("Final balance",finalBalance.toString());
        assert.equal("50000000000000000000",finalBalance.toString(),"Post Withdrawal Balance should be 500000000000000000");
    });

});