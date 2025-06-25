import { Component, OnInit } from '@angular/core';
import { InvestService } from 'src/app/services/invest.service';
import { CollectionService } from 'src/app/services/collection.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { Web3InitService } from 'src/app/services/web3-init.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private web3InitService: Web3InitService, private investService: InvestService, private collectionService: CollectionService) {
  }

  async ngOnInit(): Promise<void> {
    this.isExist = await this.collectionService.isArtworkExist();
    this.collectionService.inputLoaderHome();
    this.artworks = this.collectionService.getArtworks();
    this.account = await this.web3InitService.getMetaMaskAccount();
  }

  invest(artworkAddress: string, ART: number): void {
    this.investService.transferART(artworkAddress, ART);
  }

  panelOpenState = false;

  artwork: IArtwork;
  artworks: IArtwork[];
  isExist: boolean;
  account: string;
}
