import { Component, OnInit } from '@angular/core';
import { Web3InitService } from 'src/app/services/web3-init.service';
import { UploadService } from 'src/app/services/upload.service';
import { IArtwork } from 'src/app/interfaces/IArtwork';
import { INumber } from 'src/app/interfaces/INumber';
import { NUMBERS } from 'src/app/components/number/number.component';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private web3InitService: Web3InitService, private uploadService: UploadService) { }

  async ngOnInit(): Promise<void> {
    this.web3InitService.initWeb3();
    this.web3InitService.initArtworkToken();
    this.account = await this.web3InitService.getMetaMaskAccount();
  }

  artwork: IArtwork = {
    artworkAddress: null,
    title: null,
    creator: null,
    estimatedInterval: null,
    location: null,
    kind: null,
    materials: null,
    tokenQuantity: null,
    originalTokenQuantity: null,
    price: null,
    tokenPrice: null,
    auctioneer: null,
    investor: null,
    tokenSellers: null,
    countOfTokenSellers: null,
    ethBalance: null
  }

  inputLoaded(): void {
    if (this.artwork.price != null) {
      this.numbers = [];
      this.artwork.tokenQuantity = 0;
      if (this.artwork.price != 0) {
        this.initNumbers(this.artwork.price);
        this.artwork.tokenQuantity = this.numbers[0].value;
      }
    }
  }

  initNumbers(price: number): void {
    for (let index = 2; index < 1000000; index++){
      if (price % index == 0) {
        this.number = {
          value: index
        }
        this.numbers.push(this.number);
      }
    }
  }

  async uploadNewArtwork(): Promise<void> {
    this.uploadService.uploadNewArtwork(
      this.artwork.title,
      this.artwork.creator,
      this.artwork.estimatedInterval,
      this.artwork.location,
      this.artwork.kind,
      this.artwork.materials,
      this.artwork.tokenQuantity,
      this.artwork.price,
    )
  }

  numbers = NUMBERS;
  number: INumber;
  account: string;
}
