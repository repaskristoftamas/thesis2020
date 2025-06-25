import { Component, OnInit } from '@angular/core';
import { Web3InitService } from 'src/app/services/web3-init.service';
import Web3 from 'web3';


var web3: Web3;


@Component({
  selector: 'app-yourethbalancedisplay',
  templateUrl: './yourethbalancedisplay.component.html',
  styleUrls: ['./yourethbalancedisplay.component.scss']
})
export class YourethbalancedisplayComponent implements OnInit {

  constructor(private web3InitService: Web3InitService) {
    web3 = web3InitService.initWeb3();
  }

  async ngOnInit(): Promise<void> {
    let investorAddress: string;
    await web3.eth.getAccounts().then(function (addresses) {
      investorAddress = addresses[0];
    })
    let temp: string = await web3.eth.getBalance(investorAddress);
    let tempBalance = parseFloat(web3.utils.fromWei(temp));
    this.balance = new Intl.NumberFormat().format(Math.floor(tempBalance));
  }

  balance: string;
}
