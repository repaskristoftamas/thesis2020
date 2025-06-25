import { Component, OnInit } from '@angular/core';
import { WithdrawService } from 'src/app/services/withdraw.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { IInvestor } from 'src/app/interfaces/IInvestor';


var web3: Web3;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private withdrawService: WithdrawService, private collectionService: CollectionService, private web3InitService: Web3InitService) { }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.collectionService.isAdminLoggedIn();
    console.log(this.isAdmin);
    this.isExist = await this.collectionService.isArtworkExist();
    this.collectionService.inputLoaderHome();
    this.artworks = this.collectionService.getArtworks();
    this.owners = this.collectionService.getInvestors();
    this.owner = this.withdrawService.ownerAddress;
    this.balance = await this.withdrawService.getTokenBalance();
  }

  withdrawToOwner(): void {
    this.withdrawService.withdrawToOwner();
  }

  priceIncreasingBot(artworkAddress: string, percent: number): void {
    this.withdrawService.priceIncreasingBot(artworkAddress, percent);
  }

  priceDecreasingBot(artworkAddress: string, percent: number): void {
    this.withdrawService.priceDecreasingBot(artworkAddress, percent);
  }

  changeOwner(newOwner: string): void {
    this.withdrawService.changeOwner(newOwner);
  }

  artwork: IArtwork;
  artworks: IArtwork[];
  isAdmin: boolean;
  isExist: boolean;
  owners: IInvestor[];
  owner: string;
  balance: string;
}
