// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BidContract {
    struct Bid {
        address bidder;
        uint amount;
    }
    address public owner;
    uint public highestBid;
    address public highestBidder;
    event newbid(uint256 indexed highestBid, address indexed highestBidder);

    mapping(address => Bid) public bids;

    constructor() {
        owner = msg.sender;
    }

    function hisghestbidcheck() public view returns (uint256) {
        return highestBid;
    }

    function bid() public payable {
        require(msg.value > highestBid, "Bid too low");

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }

        highestBid = msg.value;
        highestBidder = msg.sender;
        bids[msg.sender] = Bid(msg.sender, msg.value);
        emit newbid(highestBid, highestBidder);
    }

    function endAuction() public {
        require(msg.sender == owner, "Only owner can end auction");
        require(highestBidder != address(0), "No bids received");

        payable(owner).transfer(highestBid);
        highestBid = 0;
        highestBidder = address(0);
    }
}
