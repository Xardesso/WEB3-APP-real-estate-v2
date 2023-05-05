const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BidContract", function () {
  let bidContract;
  let owner;
  let bidder1;
  let bidder2;

  beforeEach(async () => {
    [owner, bidder1, bidder2] = await ethers.getSigners();

    const BidContract = await ethers.getContractFactory("BidContract");
    bidContract = await BidContract.deploy();
    await bidContract.deployed();
  });

  it("should allow a bidder to place a bid and update the highest bid", async () => {
    // Bidder1 places a bid
    const tx = await bidContract
      .connect(bidder1)
      .bid({ value: 1000, gasPrice: ethers.utils.parseUnits("10", "gwei") });

    // Wait for the transaction to be mined
    await tx.wait();

    // Verify that the highest bid has been updated
    const highestBid = await bidContract.hishghestbidcheck();
    assert.equal(highestBid, 1000, "Highest bid should be updated");

    // Verify that the bidder's balance has been decreased by the bid amount
    const finalBalance = await ethers.provider.getBalance(bidder1.address);
    const initialBalance = await ethers.provider.getBalance(bidder1.address);
    assert.equal(
      finalBalance.toString(),
      initialBalance.sub(1000).toString(),
      "Bid amount should be deducted from bidder's balance"
    );
  });
  it("should transfer funds to the previous highest bidder when a new bid is placed", async function () {
    const initialBid = ethers.utils.parseEther("1");
    const newBid = ethers.utils.parseEther("2");

    await bidContract.connect(bidder1).bid({
      value: initialBid,
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
    });

    const balanceBefore = await ethers.provider.getBalance(bidder1.address);

    await bidContract.connect(bidder2).bid({ value: newBid });

    const balanceAfter = await ethers.provider.getBalance(bidder1.address);
    expect(balanceAfter).to.equal(balanceBefore.add(initialBid));
  });

  it("should only allow the owner to end the auction and mint the NFT to the highest bidder", async function () {
    const initialBid = ethers.utils.parseEther("1");

    await bidContract.connect(bidder1).bid({ value: initialBid });
    await bidContract.connect(owner).endAuction();

    const tokenOwner = await bidContract.ownerOf(0);
    expect(tokenOwner).to.equal(bidder1.address);

    await expect(bidContract.connect(bidder2).endAuction()).to.be.revertedWith(
      "Only owner can end auction"
    );
  });
});
