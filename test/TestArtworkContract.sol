// SPDX-License-Identifier: MIT
pragma solidity >0.5.99 <0.8.0;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ArtworkContract.sol";

contract TestArtworkContract {
    function testInitialLengthOfTokenSellers() public {
        ArtworkContract artworkContract = ArtworkContract(DeployedAddresses.ArtworkContract());

        uint expected = 0;
        Assert.equal(artworkContract.getLengthOfTokenSellers(), expected, "Token sellers array's length must be 0!");
    }
}