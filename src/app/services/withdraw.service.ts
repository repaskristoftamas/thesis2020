import { Injectable } from '@angular/core';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WithdrawtoownerdialogComponent } from 'src/app/components/withdrawtoownerdialog/withdrawtoownerdialog.component';
import { WithdrawtoauctioneerdialogComponent } from 'src/app/components/withdrawtoauctioneerdialog/withdrawtoauctioneerdialog.component';
import { AccessdenieddialogComponent } from 'src/app/components/accessdenieddialog/accessdenieddialog.component';
import { DefaulterrordialogComponent } from 'src/app/components/defaulterrordialog/defaulterrordialog.component';

var web3: Web3;
var artworkToken: Contract;


@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  constructor(private web3InitService: Web3InitService, private dialog: MatDialog) {
    web3 = web3InitService.initWeb3();
    artworkToken = web3InitService.initArtworkToken();
    this.setOwner();
  }

  async setOwner(): Promise<void> {
    this.ownerAddress = await artworkToken.methods.getOwner().call();
  }

  async getOwner(): Promise<string> {
    return await artworkToken.methods.getOwner().call()
  }

  ownerAddress: string;

  async getTokenBalance(): Promise<string> {
    let temp: string = await web3.eth.getBalance(this.web3InitService.artworkTokenAddress);
    let balance: string = web3.utils.fromWei(await temp);
    return balance;
  }

  async getContractBalance(artworkAddress: string): Promise<string> {
    let temp: string = await web3.eth.getBalance(artworkAddress);
    let balance: string = web3.utils.fromWei(await temp);
    return balance;
  }

  async withdrawToOwner(): Promise<void> {
    let activeAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      activeAddress = addresses[0];
    })
    if (this.ownerAddress == activeAddress) {
      let balance = await web3.eth.getBalance(this.web3InitService.artworkTokenAddress)
      if (parseInt(balance) > 0) {
        artworkToken.methods.withdrawToOwner().send({ from: this.ownerAddress, gas: 3000000, value: 0 })
        .then(() => {
          window.location.reload();
        }).catch(() => {
          this.openDialog__DefaultError();
        });
      }
      else {
        this.openDialog__withdrawToOwner();
      }
    }
    else {
      this.openDialog__accessDenied();
    }
  }

  async withdrawToAuctioneer(artworkAddress: string): Promise<void> {
    let auctioneerAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      auctioneerAddress = addresses[0];
    })
    let result = await artworkToken.methods.getArtworkByAddress(artworkAddress).call();
    if (result.auctioneer == auctioneerAddress) {
    let balance = await web3.eth.getBalance(artworkAddress)
        if(parseInt(balance) > 0) {
          artworkToken.methods.withdrawToAuctioneer(artworkAddress, auctioneerAddress).send({ from: auctioneerAddress, gas: 3000000, value: 0 })
          .then(() => {
            window.location.reload();
          }).catch(() => {
            this.openDialog__DefaultError();
          });
        }
        else {
          this.openDialog__withdrawToAuctioneer();
        }
    }
    else {
      this.openDialog__accessDenied();
    }
  }

  async priceIncreasingBot(artworkAddress: string, percent: number): Promise<void> {
    let activeAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      activeAddress = addresses[0];
    })
    if (this.ownerAddress == activeAddress) {
      artworkToken.methods.priceIncreasingBot(artworkAddress, percent).send({ from: this.ownerAddress, gas: 3000000, value: 0 })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__priceBot();
    }
  }

  async priceDecreasingBot(artworkAddress: string, percent: number): Promise<void> {
    let activeAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      activeAddress = addresses[0];
    })
    if (this.ownerAddress == activeAddress) {
      artworkToken.methods.priceDecreasingBot(artworkAddress, percent).send({ from: this.ownerAddress, gas: 3000000, value: 0 })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__priceBot();
    }
  }

  async changeOwner(newOwner: string): Promise<void> {
    let activeAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      activeAddress = addresses[0];
    })
    if (this.ownerAddress == activeAddress) {
      artworkToken.methods.changeOwner(newOwner).send({ from: this.ownerAddress, gas: 3000000, value: 0 })
      .then(() => {
        window.location.reload();
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__changeOwner();
    }
  }

  openDialog__withdrawToOwner() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(WithdrawtoownerdialogComponent, dialogConfig);
  }

  openDialog__accessDenied() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AccessdenieddialogComponent, dialogConfig);
  }

  openDialog__withdrawToAuctioneer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(WithdrawtoauctioneerdialogComponent, dialogConfig);
  }

  openDialog__priceBot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AccessdenieddialogComponent, dialogConfig);
  }

  openDialog__changeOwner() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AccessdenieddialogComponent, dialogConfig);
  }

  openDialog__DefaultError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DefaulterrordialogComponent, dialogConfig);
  }
}
