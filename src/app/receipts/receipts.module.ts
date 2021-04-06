import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { ReceiptsComponent } from './receipts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReceiptComponent, ReceiptListComponent, FolderListComponent, ReceiptsComponent],
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    SharedModule
  ],
  exports: [
    ReceiptComponent,
    ReceiptListComponent,
    FolderListComponent,
    ReceiptsComponent
  ]
})
export class ReceiptsModule { }
