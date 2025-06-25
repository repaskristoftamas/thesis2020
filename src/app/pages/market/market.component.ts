import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { Router } from '@angular/router';
import { InvestService } from 'src/app/services/invest.service';
import { Web3InitService } from 'src/app/services/web3-init.service';
import { IInvestor} from 'src/app/interfaces/IInvestor';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SellersdialogComponent } from 'src/app/components/sellersdialog/sellersdialog.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  constructor(private web3InitService: Web3InitService, private collectionService: CollectionService, private router: Router, private investService: InvestService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.hasSeller = await this.collectionService.hasSeller();
    this.account = await this.web3InitService.getMetaMaskAccount();
    if (this.hasSeller.length > 0) {
      this.isExist = true;
      this.collectionService.inputLoaderMarket();
      this.artworks = this.collectionService.getArtworks();
    }
  }


  async sendDataToCollectionService(artwork: IArtwork): Promise<void> {
    await this.collectionService.inputLoaderSellers(artwork.artworkAddress);
    this.tokenSellers = this.collectionService.getInvestors();
    for (let index = 0; index < this.tokenSellers.length; index++) {
    }
    this.artwork = artwork;
    this.openDialog__SellersDialog(artwork);

  }

  openDialog__SellersDialog(artwork: IArtwork) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = artwork;
    this.dialog.open(SellersdialogComponent, dialogConfig);
  }

  artwork: IArtwork;
  artworks: IArtwork[];
  hasSeller: string[];
  isExist: boolean = false;
  account: string;
  tokenSellers: IInvestor[];
}
