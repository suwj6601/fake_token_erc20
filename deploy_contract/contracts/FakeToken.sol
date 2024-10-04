// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FakeToken is ERC20, Ownable {
    uint256 public totalToken;
    uint256 public totalTokenCanBeMined;
    address[] public miner;

    constructor(
        uint256 initialSupply
    ) ERC20("FakeToken", "FT") Ownable(msg.sender) {
        _mint(msg.sender, ((initialSupply * 7) / 10)); // Mint 70% of the initial supply
        totalToken = initialSupply;
        totalTokenCanBeMined = initialSupply - ((initialSupply * 7) / 10);
        miner.push(msg.sender);
    }

    // Mint function to allow the owner to create new tokens
    function mintToken() public returns (uint256) {
        require(totalSupply() < totalToken, "Token has been mined");

        uint256 amountMined;

        // Check if more than 90% of the tokens have been mined
        if ((totalSupply() * 100) / totalToken > 90) {
            // Mint the remaining tokens
            amountMined = totalToken - totalSupply();
        } else {
            // Mint 20% of the remaining tokens that can be mined
            amountMined = totalTokenCanBeMined / 5; // Ensure totalTokenCanBeMined is defined
        }

        // Mint the tokens to the sender's address
        _mint(msg.sender, amountMined);

        // Record the miner
        addMiner(msg.sender);

        return amountMined;
    }

    function addMiner(address _miner) public {
        // Check if the address is already in the miner array
        bool exists = false;
        for (uint256 i = 0; i < miner.length; i++) {
            if (miner[i] == _miner) {
                exists = true;
                break;
            }
        }

        // If the address does not exist, add it to the miner array
        if (!exists) {
            miner.push(_miner);
        }
    }

    function getListMiner() public view returns (address[] memory) {
        return miner;
    }
}
