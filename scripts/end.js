async function main() {
  const conadd = "0x86701365Ee2b0ce9B48CF9D0E8b85364Bf914eAE";

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
