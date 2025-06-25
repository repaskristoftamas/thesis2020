import { Component, OnInit } from '@angular/core';
import { InvestService } from 'src/app/services/invest.service';

@Component({
  selector: 'app-etherpricedisplay',
  templateUrl: './etherpricedisplay.component.html',
  styleUrls: ['./etherpricedisplay.component.scss']
})
export class EtherpricedisplayComponent implements OnInit {

  constructor(private investService: InvestService) { }

  async ngOnInit(): Promise<void> {
    this.price = await this.investService.getPriceOfEther();
  }

  price: number;

}
