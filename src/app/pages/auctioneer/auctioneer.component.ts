import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { WithdrawService } from 'src/app/services/withdraw.service';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';


var web3: Web3;


@Component({
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.scss']
})
export class AuctioneerComponent implements OnInit {

  constructor(private collectionService: CollectionService, private withdrawService: WithdrawService, private web3InitService: Web3InitService) {
    web3 = this.web3InitService.initWeb3();
  }

  async ngOnInit(): Promise<void> {
    this.isExist = await this.collectionService.isAuctioneerExist();
    this.collectionService.inputLoaderAuctioneer();
    this.artworks = this.collectionService.getArtworks();
    this.account = await this.web3InitService.getMetaMaskAccount();
  }

  withdrawToAuctioneer(artworkAddress: string): void {

    this.withdrawService.withdrawToAuctioneer(artworkAddress);
  }

  artwork: IArtwork;
  artworks: IArtwork[];
  isExist: boolean;
  account: string;
}
