import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderListComponent } from './folder-list/folder-list.component';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptsComponent } from './receipts.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiptsComponent,
    children: [{
      path: "folder-list",
      component: FolderListComponent
    }, {
      path: "receipt-list/:folder",
      component: ReceiptListComponent
    },
    {
      path: "receipt/:id",
      component: ReceiptComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptsRoutingModule { }
