async function main() {
  const Token = await ethers.getContractFactory("BidContract2");
  const final = await Token.deploy();
  console.log("contract deoployed to address: ", final.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
