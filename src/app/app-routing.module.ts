import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { InvestorComponent } from 'src/app/pages/investor/investor.component';
import { MarketComponent } from 'src/app/pages/market/market.component';
import { AuctioneerComponent } from 'src/app/pages/auctioneer/auctioneer.component';
import { UploadComponent } from 'src/app/pages/upload/upload.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';  

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'investor',
    component: InvestorComponent,
  },
  {
    path: 'market',
    component: MarketComponent,
  },
  {
    path: 'auctioneer',
    component: AuctioneerComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
