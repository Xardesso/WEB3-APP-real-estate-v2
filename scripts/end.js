async function main() {
  const conadd = "0xDde9bFf1C8EFAE8Cba5BB4e61eaD878f79A3Ce47";

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
