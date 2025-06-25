// SPDX-License-Identifier: MIT
pragma solidity >0.5.99 <0.8.0;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ArtworkToken.sol";


contract TestArtworkToken {
    function testInitialOwner() public {
        ArtworkToken token = ArtworkToken(DeployedAddresses.ArtworkToken());

        address expected = 0x018Bebe1a319349CeD26eB5835678eEA91180738;
        Assert.equal(token.getOwner(), expected, "Token should have 0x018Bebe1a319349CeD26eB5835678eEA91180738 as owner initially");
    }

    function testInitialLengthOfAuctioneers() public {
        ArtworkToken token = ArtworkToken(DeployedAddresses.ArtworkToken());

        uint expected = 0;
        Assert.equal(token.getLengthOfAuctioneers(), expected, "Auctioneers array's length must be 0!");
    }

    function testInitialLengthOfInvestors() public {
        ArtworkToken token = ArtworkToken(DeployedAddresses.ArtworkToken());

        uint expected = 0;
        Assert.equal(token.getLengthOfInvestors(), expected, "Investors array's length must be 0!");
    }

    function testInitialInvestFee() public {
        ArtworkToken token = ArtworkToken(DeployedAddresses.ArtworkToken());

        uint expected = 102;
        Assert.equal(token.investFee(), expected, "InvestFee must be 102 initially!");
    }

    function testInitialTransferFee() public {
        ArtworkToken token = ArtworkToken(DeployedAddresses.ArtworkToken());

        uint expected = 102;
        Assert.equal(token.transferFee(), expected, "TranferFee must be 102 initially!");
    }
}