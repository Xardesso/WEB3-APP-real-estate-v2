async function main() {
  const conadd = "0xAE4ae2bCED66d56f6E760842D1a07F0D999DCc10";

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
