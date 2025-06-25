// SPDX-License-Identifier: MIT
pragma solidity >0.5.99 <0.8.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ArtworkContract {
    
    constructor(
        string memory _title,
        string memory _creator,
        string memory _estimatedInterval,
        string memory _location,
        string memory _kind,
        string memory _materials,
        uint32 _tokenQuantity,
        uint40 _price,
        address _auctioneer,
        ERC20 _token
    ) public {
        artwork.title = _title;
        artwork.creator = _creator;
        artwork.estimatedInterval = _estimatedInterval;
        artwork.location = _location;
        artwork.kind = _kind;
        artwork.materials = _materials;
        artwork.tokenQuantity = _tokenQuantity;
        artwork.originalTokenQuantity = _tokenQuantity;
        artwork.price = _price;
        artwork.auctioneer = _auctioneer;
        token = _token;
    }
    function setTokenPrice(uint40 _tokenPrice) public {
        artwork.tokenPrice = _tokenPrice;
    }


    ERC20 token;
    fallback() payable external {}

    function withdrawToAuctioneer(address payable auctioneer) public {
        require(auctioneer == artwork.auctioneer);
        auctioneer.transfer(address(this).balance);
    }

    Artwork public artwork;
    struct Artwork {
        string title;
        string creator;
        string estimatedInterval;
        string location;
        string kind;
        string materials;
        uint32 tokenQuantity;
        uint32 originalTokenQuantity;
        uint40 price;
        uint40 tokenPrice;
        address auctioneer;
    }
    function getArtwork() public view returns (Artwork memory) {
        return artwork;
    }
    function getAuctioneer() public view returns (address) {
        return artwork.auctioneer;
    }

    Investor investor;
    Investor[] public tokenSellers;
    mapping(address => Investor) public investors;
    mapping (address => bool) private isInvestor;
    struct Investor {
        address investorAddress;
        uint32 investorBalance;
        uint32 tokenForSale;
    }
    function getInvestor(address investorAddress) public view returns (Investor memory) {
        return investors[investorAddress];
    }

    function transferART(address newInvestorAddress, uint32 newInvestorBalance) public {
        Investor memory newInvestor = Investor(newInvestorAddress, newInvestorBalance, 0);
        addNewInvestor(newInvestorAddress, newInvestor);
        artwork.tokenQuantity -= newInvestorBalance;
    }

    function addNewInvestor(address newInvestorAddress, Investor memory newInvestor) private {
        if(isInvestor[newInvestorAddress] == false) {
            investors[newInvestorAddress] = newInvestor;
            isInvestor[newInvestorAddress] = true;
        }
        else {
            investors[newInvestorAddress].investorBalance += newInvestor.investorBalance;
        }
    }

    function approveTokenForSale(address investorAddress, uint32 amount) public {
        investors[investorAddress].tokenForSale = amount;
        tokenSellers.push(investors[investorAddress]);
    }
    function getLengthOfTokenSellers() public view returns (uint256) {
        return tokenSellers.length;
    }
    function getTokenSellers() public view returns (Investor[] memory) {
        return tokenSellers;
    }

    function transferTokenForSale(address tokenSeller, address investorAddress, uint32 amount) public payable returns (bool) {
        investors[tokenSeller].investorBalance -= amount;
        Investor memory newInvestor = Investor(investorAddress, amount, 0);
        addNewInvestor(investorAddress, newInvestor);
        uint256 index;
        while(index < tokenSellers.length && tokenSeller != tokenSellers[index].investorAddress) {
            index++;
        }
        if(index < tokenSellers.length) {
            if(amount == tokenSellers[index].tokenForSale) {
                tokenSellers[index].tokenForSale -= amount;
                investors[tokenSellers[index].investorAddress].tokenForSale -= amount;
                tokenSellers[index].investorBalance -= amount;
                delete tokenSellers[index];
            }
            else {
                tokenSellers[index].tokenForSale -= amount;
                investors[tokenSellers[index].investorAddress].tokenForSale -= amount;
                tokenSellers[index].investorBalance -= amount;
            }
        }
        return token.transferFrom(tokenSeller, investorAddress, amount);
    }

    function priceIncreasingBot(uint16 percent) public {
        uint40 amount = (artwork.price / 100) * percent;
        artwork.price += amount;
        artwork.tokenPrice = artwork.price / artwork.originalTokenQuantity;
    }
    function priceDecreasingBot(uint16 percent) public {
        uint40 amount = (artwork.price / 100) * percent;
        artwork.price -= amount;
        artwork.tokenPrice = artwork.price / artwork.originalTokenQuantity;
    }
}