var ArtworkToken = artifacts.require("../contracts/ArtworkToken.sol");
var ArtworkContract = artifacts.require("../contracts/ArtworkContract.sol");
var ArtworkFactory = artifacts.require("../contracts/ArtworkFactory.sol");

module.exports = async function (deployer) {
    await deployer.deploy(ArtworkToken);
    const token = await ArtworkToken.deployed();
    await deployer.deploy(ArtworkFactory);
    await deployer.deploy(ArtworkContract, "Default Title", "Default Creator", "Default EstimatedInterval", "Default Location", "Default Kind", "Default Materials", 0, 0, token.address, token.address);
}