async function main() {
  const conadd = "0xD34e06aA241fe0B440Efb7b700B8b99bDC5fe526";
  lockedAmount = 10000000000000;
  const values = {
    gasLimit: 1000000,
    value: 20000000000000,
  };
  const Token = await ethers.getContractFactory("BidContract");
  const final = await Token.attach(conadd);

  await final.bid(values);
  console.log("success");
  const out = await final.hisghestbidcheck();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
