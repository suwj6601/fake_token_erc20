// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const initialSupply = 1000000;
module.exports = buildModule("FakeToken", (m) => {
  const lock = m.contract("FakeToken", [initialSupply]);

  return { lock };
});
