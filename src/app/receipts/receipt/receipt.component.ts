import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt } from 'src/app/shared/models/receipt.model';
import { ReceiptListService } from 'src/app/shared/services/receipt-list.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  public isLoading: boolean = false;
  public receipt: Receipt = new Receipt();
  public receiptId: string = "";
  public dictLabels = {companyName: "Company name", siren: "SIREN",
                    address: "Address", date: "Date of invoice",
                    client: "Client name", exclTax: "Total (excluding tax)",
                    vatRate: "Tax rate", vat: "Tax", inclTax: "Total (including tax)"};
  public displayList: {}[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private receiptListService: ReceiptListService) {
    let listKeys = Object.keys(this.receipt);
    listKeys = listKeys.filter(item => !["id","folderName",  "fileName", "type", "imgSrc"].includes(item));
    listKeys.forEach(key => {
      this.displayList.push(this.renderDict(key));
    })
    this.receiptId = this.route.snapshot.paramMap.get("id");
    this.receipt = this.receiptListService.findReceipt(this.receiptId);
  }
  renderDict(attribut:string){
    let dict = {};
    dict["attribut"] = attribut;
    dict["label"] = this.dictLabels[attribut];
    dict["editable"] = false;
    return dict;
  }

  activateDivEditable(key: string, myDiv: any){
    this.displayList.forEach(item => {
      if(item["attribut"] === key){
        item["editable"] = true;
      }
    })
    setTimeout(()=>{
      myDiv.focus();
      console.log(myDiv.textContent);
    },0);
  }
  desactivateDivEditable(key: string, value: string){
    this.displayList.forEach(item => {
      if(item["attribut"] === key){
        item["editable"] = false;
      }
    })
    this.receipt[key]=value;
  }

  deleteFile() {
    const folderName=this.receipt.folderName;
    this.receiptListService.deleteReceipts([this.receiptId]);
    this.router.navigate(["receipts", "receipt-list", folderName])
  }
  ngOnInit(): void {
  }
}
