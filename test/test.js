const { expect } = require("chai");
const { ethers } = require("hardhat");

let bidContract;
let realestate;

describe("BidContract", function () {
  this.timeout(60000);
  beforeEach(async function () {
    const BidContract = await ethers.getContractFactory("BidContract");
    const REALESTATE = await ethers.getContractFactory("REALESTATE");

    bidContract = await BidContract.deploy();
    await bidContract.deployed();
    realestate = await REALESTATE.deploy();
    await realestate.deployed();
  });

  it("should allow a bidder to place a bid and update the highest bid", async function () {
    const [bidder1] = await ethers.getSigners();
    const value = 1000000;

    const tx = await bidContract.connect(bidder1).bid({ value: value });

    // Wait for the transaction to be mined
    await tx.wait();

    // Verify that the highest bid has been updated
    const highestBid = await bidContract.hisghestbidcheck();
    expect(highestBid.toNumber()).to.equal(value);
    await bidContract.endAuction();
  });

  it("should transfer funds to the previous highest bidder when a new bid is placed", async function () {
    const [bidder1, bidder2] = await ethers.getSigners();
    const bidAmount1 = ethers.utils.parseEther("0.001");
    const bidAmount2 = ethers.utils.parseEther("0.003");
    const bigNumberValue = ethers.BigNumber.from(bidAmount1.toString());
    // Bidder1 places a bid
    const tx1 = await bidContract.connect(bidder1).bid({ value: bidAmount1 });
    const receipt1 = await tx1.wait();
    const gasPrice = tx1.gasPrice;
    const gasUsed = receipt1.gasUsed;
    const txFee = ethers.BigNumber.from(gasPrice).mul(gasUsed);
    const balanceBeforeBid2 = await bidder1.getBalance();

    // Bidder2 places a higher bid, triggering a transfer to Bidder1
    const tx2 = await bidContract.connect(bidder2).bid({ value: bidAmount2 });
    const receipt2 = await tx2.wait();

    const balanceAfterBid2 = await bidder1.getBalance();

    const expectedBalance = balanceBeforeBid2.add(bidAmount1);

    expect(balanceAfterBid2).equal(
      expectedBalance,

      "Bidder1 should receive correct amount after bidder2 places a higher bid"
    );

    expect(await bidContract.highestBidder()).to.equal(
      bidder2.address,
      "Highest bidder should be updated"
    );
    await bidContract.endAuction();
  });

  it("should only allow the owner to end the auction and mint the NFT to the highest bidder", async function () {
    const [owner, bidder2] = await ethers.getSigners();

    const initialBid = ethers.utils.parseEther("0.0001");

    await bidContract.connect(bidder2).bid({ value: initialBid });
    await bidContract.connect(owner).endAuction();

    const tokenOwner = await bidContract.ownerOf(0);
    console.log(tokenOwner);
    expect(tokenOwner).to.equal(bidder2.address);
  });
});
