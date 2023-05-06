const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner;
let bidder2;
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

    const tx = await bidContract
      .connect(bidder1)
      .bid({ value: value, gasPrice: ethers.utils.parseUnits("10", "gwei") });

    // Wait for the transaction to be mined
    await tx.wait();

    // Verify that the highest bid has been updated
    const highestBid = await bidContract.hisghestbidcheck();
    expect(highestBid.toNumber()).to.equal(value);
  });

  it("should transfer funds to the previous highest bidder when a new bid is placed", async function () {
    const initialBid = 1000;
    const newBid = 2000;
    const [bidder1] = await ethers.getSigners();
    const [bidder2] = await ethers.getSigners();

    await bidContract.connect(bidder1).bid({
      value: initialBid,
    });

    const balanceBefore = await ethers.provider.getBalance(bidder1.address);

    await bidContract.connect(bidder2).bid({ value: newBid });

    const balanceAfter = await ethers.provider.getBalance(bidder1.address);
    expect(balanceAfter.sub(balanceBefore)).to.equal(initialBid);
  });

  //("should only allow the owner to end the auction and mint the NFT to the highest bidder", async function () {
  //const initialBid = ethers.utils.parseEther("1");

  //await bidContract.connect(bidder1).bid({ value: initialBid });
  //await bidContract.connect(owner).endAuction();

  //const tokenOwner = await bidContract.ownerOf(0);
  //expect(tokenOwner).to.equal(bidder1.address);

  //await expect(bidContract.connect(bidder2).endAuction()).to.be.revertedWith(
  //  "Only owner can end auction"
  //);
  //});
});
