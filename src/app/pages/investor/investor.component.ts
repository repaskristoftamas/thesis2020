import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { InvestService } from 'src/app/services/invest.service';
import { UploadService } from 'src/app/services/upload.service';
import { Web3InitService } from 'src/app/services/web3-init.service';


@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit {

  constructor(private web3InitService: Web3InitService, private collectionService: CollectionService, private investService: InvestService, private uploadService: UploadService) { }

  async ngOnInit(): Promise<void> {
    this.isExist = await this.collectionService.isInvestorExist();
    this.collectionService.inputLoaderInvestor();
    this.artworks = this.collectionService.getArtworks();
    this.account = await this.web3InitService.getMetaMaskAccount();
  }

  invest(artworkAddress: string, ART: number): void {
    this.investService.transferART(artworkAddress, ART);
  }

  async approveTokenForSale(artworkAddress: string, tokenForSale: number): Promise<void> {
    await this.investService.approveTokenForSale(artworkAddress, tokenForSale);
  }

  artwork: IArtwork;
  artworks: IArtwork[];
  isExist: boolean;
  account: string;
}
