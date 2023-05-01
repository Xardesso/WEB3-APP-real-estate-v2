require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { PRIVATE_KEY, API_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  paths: {
    artifacts: "./main-site/src/artifacts",
    cache: "./main-site/src/cache",
  },
  solidity: "0.8.",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
