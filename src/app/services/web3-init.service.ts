import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';


var web3: Web3;
var web3Provider: import("web3-core").provider;
var artworkToken: Contract;
declare const window: any;


@Injectable({
  providedIn: 'root'
})
export class Web3InitService {

  constructor() { }

  artworkTokenAddress: string = "IDE HELYETTESÍTS BE";

  initWeb3(): Web3 {
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access.");
      }
    }
    else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    }
    else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    web3 = new Web3(web3Provider);
    return web3;
  }

  initArtworkToken(): Contract {
    const { abi } = require("build/contracts/ArtworkToken.json");
    artworkToken = new web3.eth.Contract(abi, this.artworkTokenAddress);
    console.log(this.artworkTokenAddress);
    return artworkToken;
  }

  async getMetaMaskAccount(): Promise<string> {
    let account: string;
    await web3.eth.getAccounts().then(function (addresses) {
      account = addresses[0];
    })
    return account;
  }
}