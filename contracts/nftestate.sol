// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract REALESTATE is ERC721, Ownable {
    constructor() ERC721("REALESTATE", "RE") {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeia435jagllnx7hgzidfd4q7jztp2u2a7di2h5xl6an6gbk5x6phzi";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = 1;
        _safeMint(to, tokenId);
    }
}
