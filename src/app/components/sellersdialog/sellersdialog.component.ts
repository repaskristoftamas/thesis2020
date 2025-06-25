import { Component, OnInit, Inject } from '@angular/core';
import { IInvestor} from 'src/app/interfaces/IInvestor';
import { CollectionService } from 'src/app/services/collection.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarketComponent } from 'src/app/pages/market/market.component';
import { InvestService } from 'src/app/services/invest.service';


@Component({
  selector: 'app-sellersdialog',
  templateUrl: './sellersdialog.component.html',
  styleUrls: ['./sellersdialog.component.scss']
})
export class SellersdialogComponent implements OnInit {

  constructor(private investService: InvestService, private collectionService: CollectionService, public dialogRef: MatDialogRef<MarketComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tokenSellers = this.collectionService.getInvestors();
    this.artwork = this.data;
  }

  ngOnInit(): void {

  }

  transferTokenForSale(artworkAddress: string, tokenSellerAddress: string, ART: number): void {
    this.investService.transferTokenForSale(artworkAddress, tokenSellerAddress, ART);
  }

  tokenSellers: IInvestor[];
  artwork: IArtwork;
  ART: number;
}
