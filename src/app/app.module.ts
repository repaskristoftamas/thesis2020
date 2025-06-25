import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { MarketComponent } from './pages/market/market.component';
import { AuctioneerComponent } from './pages/auctioneer/auctioneer.component';
import { UploadComponent } from './pages/upload/upload.component';
import { InvestorComponent } from './pages/investor/investor.component';
import { UploadnewartworkdialogComponent } from './components/uploadnewartworkdialog/uploadnewartworkdialog.component';
import { DefaulterrordialogComponent } from './components/defaulterrordialog/defaulterrordialog.component';
import { WithdrawtoownerdialogComponent } from './components/withdrawtoownerdialog/withdrawtoownerdialog.component';
import { WithdrawtoauctioneerdialogComponent } from './components/withdrawtoauctioneerdialog/withdrawtoauctioneerdialog.component';
import { TransferartdialogComponent } from './components/transferartdialog/transferartdialog.component';
import { ApprovetokenforsaledialogComponent } from './components/approvetokenforsaledialog/approvetokenforsaledialog.component';
import { TransfertokenforsaledialogComponent } from './components/transfertokenforsaledialog/transfertokenforsaledialog.component';
import { AccessdenieddialogComponent } from './components/accessdenieddialog/accessdenieddialog.component';
import { SellersdialogComponent } from './components/sellersdialog/sellersdialog.component';
import { EtherpricedisplayComponent } from './components/etherpricedisplay/etherpricedisplay.component';
import { YourethbalancedisplayComponent } from './components/yourethbalancedisplay/yourethbalancedisplay.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    MenuComponent,
    MarketComponent,
    AuctioneerComponent,
    UploadComponent,
    InvestorComponent,
    UploadnewartworkdialogComponent,
    DefaulterrordialogComponent,
    WithdrawtoownerdialogComponent,
    WithdrawtoauctioneerdialogComponent,
    TransferartdialogComponent,
    ApprovetokenforsaledialogComponent,
    TransfertokenforsaledialogComponent,
    AccessdenieddialogComponent,
    SellersdialogComponent,
    EtherpricedisplayComponent,
    YourethbalancedisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [MarketComponent],
  bootstrap: [AppComponent],
  entryComponents: [UploadnewartworkdialogComponent, DefaulterrordialogComponent, WithdrawtoownerdialogComponent, WithdrawtoauctioneerdialogComponent,
                    TransferartdialogComponent, ApprovetokenforsaledialogComponent, TransfertokenforsaledialogComponent, AccessdenieddialogComponent, SellersdialogComponent]
})
export class AppModule { }
