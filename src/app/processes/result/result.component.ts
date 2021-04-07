import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/shared/models/form.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { Receipt } from 'src/app/shared/models/receipt.model';
import { FormService } from 'src/app/shared/services/form.service';
import { PictureService } from 'src/app/shared/services/picture.service';
import { ReceiptListService } from 'src/app/shared/services/receipt-list.service';
import { ReceiptService } from 'src/app/shared/services/receipt.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public isLoading: boolean = false;
  public receipt: Receipt = new Receipt();
  public picture: Picture = new Picture();
  public dictLabels = {companyName: "Company name", siren: "SIREN",
                    address: "Address", date: "Date of invoice",
                    client: "Client name", exclTax: "Total (excluding tax)",
                    vatRate: "Tax rate", vat: "Tax", inclTax: "Total (including tax)"};
  public displayList: {}[] = [];
  public form : Form = new Form();
  constructor(private router: Router, private formService: FormService,
    private pictureService: PictureService, private receiptService: ReceiptService, private receiptListService: ReceiptListService) {
    let listKeys = Object.keys(this.receipt);
    listKeys = listKeys.filter(item => !["id","folderName", "fileName", "type", "imgSrc"].includes(item));
    listKeys.forEach(key => {
      this.displayList.push(this.renderDict(key));
    })
    this.picture = this.pictureService.getPicture();
    if(this.picture.src){
      this.isLoading = true;
      this.form = this.formService.getForm(),
      this.receiptService.startAnalyseExtract(this.form, this.picture.src);
    }
    this.receiptService.getSubject().subscribe((receipt: Receipt)=>{
      this.receipt = receipt;
      this.isLoading = false;
    });
  }

  renderDict(attribut:string){
    let dict = {};
    dict["attribut"] = attribut;
    dict["label"] = this.dictLabels[attribut];
    dict["editable"] = false;
    return dict;
  }

  activeDivEditable(key: string, myDiv: any){
    this.displayList.forEach(item => {
      if(item["attribut"] === key){
        item["editable"] = true;
      }
    })
    setTimeout(()=>{
      myDiv.focus();
    },0);
  }
  desactiveDivEditable(key: string, value: string){
    this.displayList.forEach(item => {
      if(item["attribut"] === key){
        item["editable"] = false;
      }
    })
    this.receipt[key]=value;
  }
  goToCamera(){
    this.router.navigate(["medias", "cameras", "camera"]);
  }
  goToReceiptList(){
    this.receiptListService.addReceipt(this.receipt);
    this.router.navigate(["receipts", "receipt-list", this.form.folderName]);
  }
  ngOnInit(): void {
  }
}

