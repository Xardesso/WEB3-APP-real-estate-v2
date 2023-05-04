async function main() {
  const conadd = "0x026a89d8C483326Fd879D56D2dAbbFde84659E84";

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
