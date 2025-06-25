module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
      //from: "0x697c0B056cB81C1326F14d2bEfb26D8f411bF000"
    },
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: "0.6.10",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
      },
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
};