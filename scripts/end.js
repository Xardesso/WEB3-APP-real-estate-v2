async function main() {
  const conadd = "0x57c50eA3A17079Ed8C1069C7E487cCcc93A51d9F";

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
