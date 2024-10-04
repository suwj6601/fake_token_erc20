require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const NODE_ENDPOINT = process.env.NODE_END_POINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("PRIVATE_KEY: ", PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    "base-sepolia": {
      url: NODE_ENDPOINT,
      accounts: [PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
};
