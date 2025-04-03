// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QB3Token is ERC20, Ownable {
    uint256 public immutable maxSupply = 10_000 * 10 ** 18;
    mapping(address => bool) public isMinter;

    constructor() ERC20("QB3 Token", "QB3") Ownable(msg.sender) {
        // Mint initial (trésorerie DAO, tests, etc.)
        _mint(msg.sender, 1_000 * 10 ** 18);
    }

    modifier onlyMinter() {
        require(isMinter[msg.sender], "QB3: not authorized to mint");
        _;
    }

    function setMinter(address account, bool enabled) external onlyOwner {
        isMinter[account] = enabled;
    }

    function mint(address to, uint256 amount) external onlyMinter {
        require(totalSupply() + amount <= maxSupply, "QB3: exceeds max supply");
        _mint(to, amount);
    }
}
