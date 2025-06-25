import { Component, Injectable } from '@angular/core';
import { Web3InitService } from './web3-init.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadnewartworkdialogComponent } from 'src/app/components/uploadnewartworkdialog/uploadnewartworkdialog.component';
import { DefaulterrordialogComponent } from 'src/app/components/defaulterrordialog/defaulterrordialog.component';


var web3: Web3;
var artworkToken: Contract;


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private web3InitService: Web3InitService, private dialog: MatDialog) {
    web3 = web3InitService.initWeb3();
    artworkToken = web3InitService.initArtworkToken();
  }

  async uploadNewArtwork(title: string, creator: string, estimatedInterval: string, location: string, kind: string, materials: string, tokenQuantity: number, price: number): Promise<void> {
    let auctioneer;
    let inputsAreAcceptable;

    inputsAreAcceptable = await this.AreInputsAcceptable(title, creator);

    if (inputsAreAcceptable == true && price > 0) {
      await web3.eth.getAccounts().then(function (addresses) {
        auctioneer = addresses[0];
      })
      .then(() => {
        artworkToken.methods.uploadNewArtwork(title, creator, estimatedInterval, location, kind, materials, tokenQuantity, price, auctioneer, this.web3InitService.artworkTokenAddress).send({ from: auctioneer, gas: 3000000, value: 0 })
        .then(() => {
          window.location.reload();
        }).catch(() => {
          this.openDialog__DefaultError();
        });
      }).catch(() => {
        this.openDialog__DefaultError();
      });
    }
    else {
      this.openDialog__uploadNewArtwork();
    }
  }

  async AreInputsAcceptable(title: string, creator: string): Promise<boolean> {
    let inputsAreAcceptable = false;
    let temp = 0;
    let length = await artworkToken.methods.ID().call();

    if (length == 0) {
      inputsAreAcceptable = true;
    }
    else {
      for (let index = 0; index < length; index++) {
        let result = await artworkToken.methods.getArtworkByID(index).call();
        if (title == result.title && creator == result.creator) {
          temp++;
        }
      }
    }
    
    if (temp == 0) {
      inputsAreAcceptable = true;
    }

    return inputsAreAcceptable;
  }



  openDialog__uploadNewArtwork() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadnewartworkdialogComponent, dialogConfig);
  }

  openDialog__DefaultError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DefaulterrordialogComponent, dialogConfig);
  }
}