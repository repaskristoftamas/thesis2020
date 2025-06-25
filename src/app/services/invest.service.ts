import { Injectable } from '@angular/core';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DefaulterrordialogComponent } from 'src/app/components/defaulterrordialog/defaulterrordialog.component';
import { TransferartdialogComponent } from 'src/app/components/transferartdialog/transferartdialog.component';
import { ApprovetokenforsaledialogComponent } from 'src/app/components/approvetokenforsaledialog/approvetokenforsaledialog.component';
import { TransfertokenforsaledialogComponent } from 'src/app/components/transfertokenforsaledialog/transfertokenforsaledialog.component';
import { Router } from '@angular/router';


var web3: Web3;
var artworkToken: Contract;


@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private web3InitService: Web3InitService, private dialog: MatDialog, private router: Router) {
    web3 = web3InitService.initWeb3();
    artworkToken = web3InitService.initArtworkToken();
  }

  async transferART(artworkAddress: string, ART: number): Promise<void> {
    let result = await artworkToken.methods.getArtworkByAddress(artworkAddress).call();
    if (ART > 0 && Number(ART) <= result.tokenQuantity) {
      let investFee = await artworkToken.methods.investFee().call() - 100;
      let priceOfEther = await this.getPriceOfEther();
      //let priceOfEther = 100;
      let netAmount = (ART * result.tokenPrice) / priceOfEther;
      let divide = netAmount / 100;
      let total = netAmount + (divide * investFee);
      let investorAddress;
      
      await web3.eth.getAccounts().then(function (addresses) {
        investorAddress = addresses[0];
      })

      return artworkToken.methods.transferART(artworkAddress, ART).send({ from: investorAddress, gas: 3000000, value: web3.utils.toWei(total.toString(), "ether") })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__transferART();
    }
  }

  async approveTokenForSale(artworkAddress: string, tokenForSale: number): Promise<void> {
    let investorAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      investorAddress = addresses[0];
    })

    let investor = await artworkToken.methods.getInvestor(artworkAddress, investorAddress).call();
    if (tokenForSale > 0 && Number(tokenForSale) <= investor.investorBalance && await artworkToken.methods.allowance(investorAddress, artworkAddress).call() == 0)  {
      let result = await artworkToken.methods.getArtworkByAddress(artworkAddress).call();
      let transferFee = await artworkToken.methods.transferFee().call() - 100;
      let priceOfEther = await this.getPriceOfEther();
      //let priceOfEther = 100;
      let total = (((tokenForSale * result.tokenPrice) / 100) * transferFee / priceOfEther);

      return artworkToken.methods.approveTokenForSale(artworkAddress, investorAddress, tokenForSale).send({ from: investorAddress, gas: 3000000, value: web3.utils.toWei(total.toString(), "ether") })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__approveTokenForSale();
    }
  }

  async transferTokenForSale(artworkAddress: string, tokenSellerAddress: string, ART: number): Promise<void> {
    let investorAddress;
    await web3.eth.getAccounts().then(function (addresses) {
      investorAddress = addresses[0];
    })

    let tokenSeller = await artworkToken.methods.getInvestor(artworkAddress, tokenSellerAddress).call();
    if (ART > 0 && Number(ART) <= tokenSeller.tokenForSale) {
      let result = await artworkToken.methods.getArtworkByAddress(artworkAddress).call();
      let transferFee = await artworkToken.methods.transferFee().call() - 100;
      let priceOfEther = await this.getPriceOfEther();
      //let priceOfEther = 100;
      let total = (((ART * result.tokenPrice) / 100) * transferFee / priceOfEther) + ((ART * result.tokenPrice) / priceOfEther);

      return artworkToken.methods.transferTokenForSale(artworkAddress, tokenSellerAddress, investorAddress, ART).send({ from: investorAddress, gas: 3000000, value: web3.utils.toWei(total.toString(), "ether") })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__transferTokenForSale();
    }
  }

  async getPriceOfEther(): Promise<number> {
    let Web3PriceConsumer = require("web3");
    let web3PriceConsumer = new Web3PriceConsumer("https://mainnet.infura.io/v3/5c889944c2284a89ab083b59fab72bc3");
    let aggregatorInterfaceABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
    let address = "0xF79D6aFBb6dA890132F9D7c355e3015f15F3406F";
    let priceFeed = new web3PriceConsumer.eth.Contract(aggregatorInterfaceABI, address);
    let USD;
    let roundToRealValue = 100000000;

    await priceFeed.methods.latestAnswer().call()
      .then((price) => {
        USD = price / roundToRealValue;
      })
    return USD;
  }



  openDialog__transferART() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(TransferartdialogComponent, dialogConfig);
  }

  openDialog__approveTokenForSale() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ApprovetokenforsaledialogComponent, dialogConfig);
  }

  openDialog__transferTokenForSale() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(TransfertokenforsaledialogComponent, dialogConfig);
  }

  openDialog__DefaultError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DefaulterrordialogComponent, dialogConfig);
  }
}
