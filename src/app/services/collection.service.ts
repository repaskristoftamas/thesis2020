import { Injectable } from '@angular/core';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { ARTWORKS } from 'src/app/components/artwork/artwork.component';
import { IInvestor } from 'src/app/interfaces/IInvestor';
import { INVESTORS } from 'src/app/components/investor/investor.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DefaulterrordialogComponent } from 'src/app/components/defaulterrordialog/defaulterrordialog.component';
import { WithdrawService } from 'src/app/services/withdraw.service';


var web3: Web3;
var artworkToken: Contract;


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private web3InitService: Web3InitService, private dialog: MatDialog, private withdrawService: WithdrawService) {
    web3 = this.web3InitService.initWeb3();
    artworkToken = this.web3InitService.initArtworkToken();
  }

  artwork: IArtwork;
  artworks = ARTWORKS;
  investor: IInvestor;
  investors = INVESTORS;

  getArtworks(): IArtwork[] {
    return this.artworks;
  }

  getInvestors(): IInvestor[] {
    return this.investors;
  }

  inputLoaderHome(): void {
    this.artworks = [];
    this.getHome();
  }

  inputLoaderAuctioneer(): void {
    this.artworks = [];
    this.getArtworksOfAuctioneer();
  }

  inputLoaderInvestor(): void {
    this.artworks = [];
    this.getArtworkOfInvestor();
  }

  inputLoaderMarket(): void {
    this.artworks = [];
    this.getArtworksOfMarket();
  }

  async inputLoaderSellers(artworkAddress: string): Promise<void> {
    this.investors = [];
    await this.getTokenSellers(artworkAddress);
  }

  async getHome(): Promise<void> {
    let length = await artworkToken.methods.ID().call();
    for (let index = 0; index < length; index++) {
      await artworkToken.methods.getArtworkContractByID(index).call()
        .then((artworkAddress) => {
          artworkToken.methods.getArtworkByAddress(artworkAddress).call()
            .then((result) => {
              this.artwork = {
                artworkAddress: artworkAddress,
                title: result.title,
                creator: result.creator,
                estimatedInterval: result.estimatedInterval,
                location: result.location,
                kind: result.kind,
                materials: result.materials,
                tokenQuantity: result.tokenQuantity,
                originalTokenQuantity: result.originalTokenQuantity,
                price: result.price,
                tokenPrice: result.tokenPrice,
                auctioneer: result.auctioneer,
                investor: null,
                tokenSellers: null,
                countOfTokenSellers: null,
                ethBalance: null
              }
              this.artworks.push(this.artwork);
            }).catch(() => {
              this.openDialog__DefaultError();
            });
        }).catch(() => {
          this.openDialog__DefaultError();
        });
    }
  }
  async isArtworkExist(): Promise<boolean> {
    let isExist = false;
    let length = await artworkToken.methods.ID().call();
    console.log(length);
    if (length == 0) {
      isExist = false;
    }
    else {
      isExist = true;
    }

    return isExist;
  }

  async getArtworksOfAuctioneer(): Promise<void> {
    let auctioneerAddress;
    await web3.eth.getAccounts().then(function (addresses) {
      auctioneerAddress = addresses[0];
    })
    let length = await artworkToken.methods.ID().call();
    for (let index = 0; index < length; index++) {
      await artworkToken.methods.getArtworkContractByID(index).call()
        .then((artworkAddress) => {
          artworkToken.methods.getArtworkByAddress(artworkAddress).call()
            .then(async (result) => {
              if (auctioneerAddress == result.auctioneer) {
                this.artwork = {
                  artworkAddress: artworkAddress,
                  title: result.title,
                  creator: result.creator,
                  estimatedInterval: result.estimatedInterval,
                  location: result.location,
                  kind: result.kind,
                  materials: result.materials,
                  tokenQuantity: result.tokenQuantity,
                  originalTokenQuantity: result.originalTokenQuantity,
                  price: result.price,
                  tokenPrice: result.tokenPrice,
                  auctioneer: result.auctioneer,
                  investor: null,
                  tokenSellers: null,
                  countOfTokenSellers: null,
                  ethBalance: await this.withdrawService.getContractBalance(artworkAddress)
                }
                this.artworks.push(this.artwork);
              }
            }).catch(() => {
              this.openDialog__DefaultError();
            });
        }).catch(() => {
          this.openDialog__DefaultError();
        });
    }
  }
  async isAuctioneerExist(): Promise<boolean> {
    let isExist = false;
    let auctioneerAddress;
    await web3.eth.getAccounts().then(function (addresses) {
      auctioneerAddress = addresses[0];
    })

    let length = await artworkToken.methods.getLengthOfAuctioneers().call();
    let auctioneers: string[] = [];
    for (let index = 0; index < length; index++) {
      auctioneers.push(await artworkToken.methods.auctioneers(index).call());
    }

    let index = 0;
    while (index < auctioneers.length && auctioneers[index] != auctioneerAddress) {
      index++;
    }
    if (index < auctioneers.length) {
      isExist = true;
    }

    return isExist;
  }

  async getArtworkOfInvestor(): Promise<void> {
    let investorAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      investorAddress = addresses[0];
    })
    let length = await artworkToken.methods.ID().call();
    for (let index = 0; index < length; index++) {
      await artworkToken.methods.getArtworkContractByID(index).call()
        .then((artworkAddress) => {
          artworkToken.methods.getInvestor(artworkAddress, investorAddress).call()
            .then((investor) => {
              if (investorAddress == investor.investorAddress) {
                artworkToken.methods.getArtworkByAddress(artworkAddress).call()
                  .then(async (result) => {
                    this.artwork = {
                      artworkAddress: artworkAddress,
                      title: result.title,
                      creator: result.creator,
                      estimatedInterval: result.estimatedInterval,
                      location: result.location,
                      kind: result.kind,
                      materials: result.materials,
                      tokenQuantity: result.tokenQuantity,
                      originalTokenQuantity: result.originalTokenQuantity,
                      price: result.price,
                      tokenPrice: result.tokenPrice,
                      auctioneer: result.auctioneer,
                      investor: investor,
                      tokenSellers: null,
                      countOfTokenSellers: null,
                      ethBalance: null
                    }
                    this.artworks.push(this.artwork);
                  }).catch(() => {
                    this.openDialog__DefaultError();
                  });
              }
            }).catch(() => {
              this.openDialog__DefaultError();
            });
        }).catch(() => {
          this.openDialog__DefaultError();
        });
    }
  }
  async isInvestorExist(): Promise<boolean> {
    let isExist = false;
    let investorAddress;
    await web3.eth.getAccounts().then(function (addresses) {
      investorAddress = addresses[0];
    })

    let investors: string[] = [];
    let length = await artworkToken.methods.getLengthOfInvestors().call();
    for (let index = 0; index < length; index++) {
      investors.push(await artworkToken.methods.investors(index).call());
    }

    let index = 0;
    while (index < investors.length && investorAddress != investors[index]) {
      index++;
    }
    if (index < investors.length) {
      isExist = true;
    }

    return isExist;
  }

  async getArtworksOfMarket(): Promise<void> {
    await this.hasSeller()
      .then((hasSellers) => {
        for (let index = 0; index < hasSellers.length; index++) {
          artworkToken.methods.getArtworkByID(index).call()
            .then(async (result) => {
              this.artwork = {
                artworkAddress: hasSellers[index],
                title: result.title,
                creator: result.creator,
                estimatedInterval: result.estimatedInterval,
                location: result.location,
                kind: result.kind,
                materials: result.materials,
                tokenQuantity: result.tokenQuantity,
                originalTokenQuantity: result.originalTokenQuantity,
                price: result.price,
                tokenPrice: result.tokenPrice,
                auctioneer: result.auctioneer,
                investor: null,
                tokenSellers: await artworkToken.methods.getTokenSellers(hasSellers[index]).call(),
                countOfTokenSellers: await this.getLengthOfTokenSellers(hasSellers[index]),
                ethBalance: null
              }
              if (this.artwork.countOfTokenSellers > 0) {
                this.artworks.push(this.artwork);
              }
            }).catch(() => {
              this.openDialog__DefaultError();
            });
        }
      }).catch(() => {
        this.openDialog__DefaultError();
      });
  }
  async getLengthOfTokenSellers(artworkAddress: string): Promise<number> {
    let length: number = 0;
    await artworkToken.methods.getTokenSellers(artworkAddress).call()
    .then((tokenSellers) => {
      for (let index = 0; index < tokenSellers.length; index++) {
        if (tokenSellers[index].investorAddress != "0x0000000000000000000000000000000000000000") {
          length++;
        }
      }
    }).catch(() => {
      this.openDialog__DefaultError();
    });
    return length;
  }
  async hasSeller(): Promise<string[]> {
    let hasSeller: string[] = [];
    let length = await artworkToken.methods.ID().call();
    for (let index = 0; index < length; index++) {
      let lengthOfTokenSellers: number = await artworkToken.methods.getLengthOfTokenSellers(index).call();
      if (lengthOfTokenSellers > 0) {
        hasSeller.push(await artworkToken.methods.getArtworkContractByID(index).call());
      }
    }
    return hasSeller;
  }
  async getTokenSellers(artworkAddress: string): Promise<void> {
    await artworkToken.methods.getTokenSellers(artworkAddress).call()
      .then((tokenSellers) => {
        for (let index = 0; index < tokenSellers.length; index++) {
          if (tokenSellers[index].investorAddress != "0x0000000000000000000000000000000000000000") {
            this.investor = {
              investorAddress: tokenSellers[index].investorAddress,
              investorBalance: tokenSellers[index].investorBalance,
              tokenForSale: tokenSellers[index].tokenForSale
            }
            this.investors.push(this.investor);
          }
        }
      }).catch(() => {
        this.openDialog__DefaultError();
      });
  }

  async isAdminLoggedIn(): Promise<boolean> {
    let isAdmin = false;
    let ownerAddress: string;
    let address: string;
    await web3.eth.getAccounts().then(function (addresses) {
      ownerAddress = addresses[0];
    })

    console.log(ownerAddress);
    console.log(await this.withdrawService.getOwner());
    if (ownerAddress == await this.withdrawService.getOwner()) {
      
      isAdmin = true;
    }

    return isAdmin;
  }



  openDialog__DefaultError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DefaulterrordialogComponent, dialogConfig);
  }
}
