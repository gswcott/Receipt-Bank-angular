import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt } from 'src/app/shared/models/receipt.model';
import { FolderService } from 'src/app/shared/services/folder.service';
import { ReceiptListService } from 'src/app/shared/services/receipt-list.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  public receiptListFolder: Receipt[] = [];
  public folderName: any;
  public isChecked: { [k: string]: boolean } = {};
  public checkedIds: string[] = [];
  public lastCheckedId: string = "";
  constructor(private router: Router, private route: ActivatedRoute, private receiptListService: ReceiptListService) {
    this.folderName = this.route.snapshot.paramMap.get("folder");
    if (this.folderName) {
      this.receiptListFolder = this.receiptListService.filterReceiptsByFolder(this.folderName);
      this.receiptListFolder.forEach(receipt => {
        this.isChecked[receipt.id] = false;
      })
    }
  }
  updateCheckedIds(value: any) {
    this.checkedIds = Object.keys(this.isChecked).reduce((list: string[], key: string) => {
      if (this.isChecked[key]) list.push(key);
      return list;
    }, []);
    this.lastCheckedId = this.checkedIds[this.checkedIds.length-1];
  }
  deleteFiles() {
    this.receiptListService.deleteReceipts(this.checkedIds);
    if(this.folderName){
      this.receiptListFolder = this.receiptListService.filterReceiptsByFolder(this.folderName);
    }
  }
  goToReceiptDetail(){
    if(this.lastCheckedId){
      this.router.navigate(["receipts", "receipt", this.lastCheckedId])
    }
  }
  ngOnInit(): void {
  }
}

