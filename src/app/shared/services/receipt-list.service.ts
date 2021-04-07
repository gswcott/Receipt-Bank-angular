import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt.model';
import { SharedRoutingModule } from '../shared-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ReceiptListService {

  private receiptList: Receipt[]=[];
  constructor() {
  }
  getReceiptList(){
    return this.receiptList;
  }
  addReceipt(receipt: Receipt){
    this.receiptList.push(receipt);
  }

  deleteReceipt(id: string){
    const index = this.receiptList.findIndex(element => element.id === id);
    this.receiptList.splice(index,1);
  }
  deleteReceipts(idList: string[]){
    idList.forEach(id => {
      this.deleteReceipt(id);
    })
  }
  findReceipt(id: string){
    return this.receiptList.find(element => element.id === id);
  }

  filterReceiptsByFolder(folderName: string){
    return this.receiptList.filter(element => element.folderName === folderName);
  }
}
