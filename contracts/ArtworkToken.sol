// SPDX-License-Identifier: MIT
pragma solidity >0.5.99 <0.8.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin//contracts/access/Ownable.sol";
import "../contracts/ArtworkContract.sol";
import "../contracts/ArtworkFactory.sol";

contract ArtworkToken is ERC20, Ownable {

    constructor() public ERC20("Artwork Token", "ART", 0) {
        uint8 artworkTokenSupply = 0;
        _mint(msg.sender, artworkTokenSupply);
    }

    fallback() payable external {}

    function withdrawToOwner() public onlyOwner {
        address payable _owner = address(uint160(owner()));
        _owner.transfer(address(this).balance);
    }
    function withdrawToAuctioneer(address addr, address payable auctioneer) public {
        artworkContractByAddress[addr].withdrawToAuctioneer(auctioneer);
    }

    function getOwner() public view returns (address) {
        return owner();
    }
    function changeOwner(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    }

    uint256 public ID;
    mapping(uint256 => ArtworkContract) public artworkContractByID;
    mapping(address => ArtworkContract) public artworkContractByAddress;

    ArtworkContract artworkContract;
    ArtworkFactory artworkFactory = new ArtworkFactory();
    function cica() public view returns (ArtworkFactory) {
        return artworkFactory;
    }

    address[] public auctioneers;
    function getLengthOfAuctioneers() public view returns (uint256) {
        return auctioneers.length;
    }

    address[] public investors;
    mapping (address => bool) private isInvestor;
    function getLengthOfInvestors() public view returns (uint256) {
        return investors.length;
    }

    uint8 public investFee = 102;
    uint8 public transferFee = 102;

    
    function uploadNewArtwork(
        string memory _title,                   //Mona Lisa
        string memory _creator,                 //Leonardo da Vinci
        string memory _estimatedInterval,       //1503-1519
        string memory _location,                //Louvre, Párizs
        string memory _kind,                    //Olajfestmény
        string memory _materials,               //Olajfesték, nyárfa
        uint32 _tokenQuantity,                  //10000
        uint40 _price,                          //850000000 (850 millió $)
        address _auctioneer,
        ERC20 _token
    ) public payable {
        artworkContract = artworkFactory.uploadNewArtwork(_title, _creator, _estimatedInterval, _location, _kind, _materials, _tokenQuantity, _price, _auctioneer, _token);
        artworkContract.setTokenPrice(_price / _tokenQuantity);
        address addr = address(artworkContract);
        artworkContractByID[ID] = artworkContract;
        artworkContractByAddress[addr] = artworkContract;
        auctioneers.push(_auctioneer);
        ID++;
        _mint(addr, _tokenQuantity);
    }
    
    
    function getArtworkContractByID(uint256 id) public view returns (ArtworkContract) {
        return artworkContractByID[id];
    }

    function getArtworkByID(uint256 id) public view returns (ArtworkContract.Artwork memory) {
        return artworkContractByID[id].getArtwork();
    }
    function getArtworkByAddress(address addr) public view returns (ArtworkContract.Artwork memory) {
        return artworkContractByAddress[addr].getArtwork();
    }

    function getInvestor(address addr, address investorAddress) public view returns (ArtworkContract.Investor memory) {
        return artworkContractByAddress[addr].getInvestor(investorAddress);
    }

    
    function transferART(address payable addr, uint32 amount) public payable returns (bool)  {
        require(amount <= this.balanceOf(addr));
        addr.transfer((msg.value / investFee) * 100);
        artworkContractByAddress[addr].transferART(msg.sender, amount);
        addNewInvestor(msg.sender);
        approve(addr, address(this), amount);
        return this.transferFrom(addr, msg.sender, amount);
    }
    function addNewInvestor(address investor) private {
        if(isInvestor[investor] == false) {
            investors.push(investor);
            isInvestor[investor] = true;
        }
    }
    
    
    function approveTokenForSale(address addr, address investor, uint32 amount) public payable returns (bool) {
        require(amount <= getInvestor(addr, investor).investorBalance && getInvestor(addr, investor).tokenForSale == 0);
        artworkContractByAddress[addr].approveTokenForSale(investor, amount);
        address(this).transfer(msg.value);
        return approve(msg.sender, addr, amount);
    }
    
    function getLengthOfTokenSellers(uint256 id) public view returns (uint256) {
        return artworkContractByID[id].getLengthOfTokenSellers();
    }
    
    function getTokenSellers(address addr) public view returns (ArtworkContract.Investor[] memory) {
        return artworkContractByAddress[addr].getTokenSellers();
    }
    
    function transferTokenForSale(address addr, address payable tokenSeller, address investor, uint32 amount) public payable returns (bool) {
        require(amount <= allowance(tokenSeller, addr));
        addNewInvestor(investor);
        tokenSeller.transfer((msg.value / transferFee) * 100);
        return artworkContractByAddress[addr].transferTokenForSale(tokenSeller, investor, amount);
    }
    
    function priceIncreasingBot(address addr, uint16 percent) public onlyOwner {
        artworkContractByAddress[addr].priceIncreasingBot(percent);
    }
    function priceDecreasingBot(address addr, uint16 percent) public onlyOwner {
        artworkContractByAddress[addr].priceDecreasingBot(percent);
    }
}