async function main() {
  // Deploy Contract1
  const Contract1Factory = await ethers.getContractFactory("BidContract");
  const contract1 = await Contract1Factory.deploy();

  console.log("Contract1 main deployed to:", contract1.address);

  // Deploy Contract2
  const Contract2Factory = await ethers.getContractFactory("REALESTATE");
  const contract2 = await Contract2Factory.deploy();

  console.log("Contract2 deployed to:", contract2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
