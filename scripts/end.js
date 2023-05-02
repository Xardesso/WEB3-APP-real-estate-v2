async function main() {
  const conadd = "0xeb5B0fbbeE16244aFb362451B48C9D934cFfA09E";

  const Token = await ethers.getContractFactory("BidContract");
  const final = await Token.attach(conadd);

  await final.endAuction();
  console.log("success");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
