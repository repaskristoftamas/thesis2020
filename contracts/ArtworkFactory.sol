// SPDX-License-Identifier: MIT
pragma solidity >0.5.99 <0.8.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../contracts/ArtworkContract.sol";
import "../contracts/ArtworkToken.sol";

contract ArtworkFactory {

        ArtworkContract artworkContract;

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
    ) public payable returns (ArtworkContract) {
        artworkContract = new ArtworkContract(
            _title,
            _creator,
            _estimatedInterval,
            _location,
            _kind,
            _materials,
            _tokenQuantity,
            _price,
            _auctioneer,
            _token
        );
        return artworkContract;
    }
}