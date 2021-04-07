import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt.model';
import * as Tesseract from 'tesseract.js';
import { Form } from '../models/form.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  private receipt: Receipt = new Receipt();
  public subject: Subject<Receipt> = new Subject();
  //dictReceipts: Object = {};
  constructor() {
    // if (typeof (Storage) != "undefined") {
    //   if (localStorage.receiptBank01) {
    //     this.dictReceipts = JSON.parse(localStorage.receiptBank01);
    //   }
    // }
    //this.scanLines(this.receipt.textOCR);
  }
  getReceipt() {
    return this.receipt;
  }
  getSubject(): Subject<Receipt> {
    return this.subject;
  }
  getValue(key: string) {
    return this.receipt[key as keyof Receipt];
  }
  setValue(key: string, value: string) {
    this.receipt[key as keyof Receipt] = value;
  }

  changeValue(key: string, value: string) {
    this.receipt[key as keyof Receipt] = value;
    this.subject.next(this.receipt);
  }

  setValuesForm(form: Form, src: string) {
    Object.keys(form).forEach(key =>{
      this.setValue(key, form[key]);
    })
    this.setValue('imgSrc', src);
    this.subject.next(this.receipt);
  }
  isKeyDate(line: string) {
    if (line.match(/Date/i)) {
      return true;
    }
    return false;
  }
  isValueDate(line: string) {
    if (line.match(/\d{2}(\/|.)*\d{2}(\/|.)*\d{2,}/g)) {
      return true;
    }
    return false;
  }
  setValueDate(line: string) {
    if (this.isKeyDate(line) && this.isValueDate(line)) {
      const res = line.match(/\d{2}(\/|.)*\d{2}(\/|.)*\d{2,}/g);
      if (res) {
        this.setValue('date', res[0]);
      }
    }
  }
  //Siren
  isKeySiren(line: string) {
    if (line.match(/SIREN|SIRET/i)) {
      return true;
    }
    return false;
  }
  setSirenNumber(line: string) {
    if (this.isKeySiren(line)) {
      const res = line.match(/(\s\d{9}|(\s\d+\s*\d+\s*\d+))/g);
      if (res) {
        this.setValue('siren', res[0]);
      }
    }
  }

  // total tva ttc
  extractPrice(line: string) {
    const res = line.match(/\d+(,|\.)*\d+\s*€*/g);
    if (res) {
      return res[0];
    }
    return '';
  }

  isPct(line: string) {
    if (line.match(/\d+(,|.)*\d*\s*%/g)) {
      return true;
    }
    return false;
  }
  isPrice(line: string) {
    if (line.match(/\d+(,|.)*\d+\s*€*/g)) {
      return true;
    }
    return false;
  }

  isKeyExclTax(line: string) {
    if (line.match(/TOTA.\s*(net)*\s*H[^H]*T[^T]*/i)) {
      return true;
    }
    return false;
  }
  setValueExclTax(line: string) {
    if (this.isKeyExclTax(line)) {
      this.setValue('exclTax', this.extractPrice(line));
    }
  }
  // "TOTAL(\s)?([HORS(\s)TAXE]{5,}|HT)([\s\S]*?)(€|E|euros)"

  isKeyInclTax(line: string) {
    if (!this.isKeyExclTax(line) && line.match(/TOTA.\s*(TTC)*/i)) {
      return true;
    }
    return false;
  }
  setValueInclTax(line: string) {
    if (this.isKeyInclTax(line)) {
      this.setValue('inclTax', this.extractPrice(line));
    }
  }

  isKeyVat(line: string) {
    if (line.match(/(TOTA.)*\s*TVA\s*[^A-Z]*\s*\d+(,|.)*\d+\s*€*/i)) {
      return true;
    }
    return false;
  }
  setValueVatRate(line: string) {
    if (this.isKeyVat(line)) {
      const res = line.match(/\d+(,|.)*\d*\s*%/g);
      if (res) {
        this.setValue('vatRate', res[0]);
      }
    }
  }
  setValueVat(line: string) {
    if (this.isKeyVat(line)) {
      if (this.isPct(line)) {
        const tmp = line.split(/\d+(,|.)*\d*\s*%/g);
        this.setValue('vat', this.extractPrice(tmp[tmp.length - 1]));
      } else {
        this.setValue('vat', this.extractPrice(line));
      }
    }
  }

  extractValueAddressStreet(line: string) {
    return line.match(
      /\d*\D*\s*(rue|avenue|allée|boulevard|chuassée|chemin|cité)\D+/i
    );
  }
  extractValueAddressPC(line: string) {
    return line.match(/\d{5}\s*\D+/i);
  }
  extractValueAddressCountry(line: string) {
    return line.match(/(France|Fr)/i);
  }
  isKeyAddress(line: string) {
    if (line.match(/address/i)) {
      return true;
    }
    return false;
  }
  setValueAddress(arrayLines: string[]) {
    let address = '';
    let i = 0;
    while (i < arrayLines.length) {
      const res = this.extractValueAddressStreet(arrayLines[i]);
      if (res) {
        address = address + res[0];
        break;
      }
      i++;
    }
    if (i <= arrayLines.length - 2) {
      const resCp = this.extractValueAddressPC(arrayLines[i + 1]);
      if (resCp) {
        address = address + ', ' + resCp[0];
      }
    }
    if (i <= arrayLines.length - 3) {
      const resCountry = this.extractValueAddressCountry(arrayLines[i + 2]);
      if (resCountry) {
        address = address + ', ' + resCountry[0];
      }
    }
    this.setValue('address', address);
  }

  scanLines(text: string) {
    //console.log(JSON.stringify(text));
    const arrayLines = text.split(/\n+/);
    //console.log(arrayLines);
    if (!arrayLines[arrayLines.length - 1]) {
      arrayLines.pop();
    }
    //console.log(arrayLines);
    this.setValueAddress(arrayLines);
    arrayLines.forEach((line) => {
      this.setSirenNumber(line);
      this.setValueDate(line);
      this.setValueExclTax(line);
      this.setValueVat(line);
      this.setValueVatRate(line);
      this.setValueInclTax(line);
    });
  }
  extractText() {
    Tesseract.recognize(this.receipt.imgSrc, 'fra', {
      logger: (m) => {
        //console.log(m);
      },
    }).then(({ data: { text } }) => {
      this.scanLines(text);
      this.subject.next(this.receipt);
      //this.affectValues();
    });
  }
  affectValueId(){
    const date=new Date();
    const id=date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-"
    + date.getDate().toString() + "-" + date.getHours().toString()+  "-"
    + date.getMinutes().toString() + "-" + date.getSeconds().toString();
    this.setValue("id", id);
  }

  startAnalyseExtract(form: Form, src: string){
    this.receipt = new Receipt();
    this.affectValueId();
    this.setValuesForm(form, src);
    this.extractText();
  }
}


// storeReceipt(fileName:string){
//   this.dictReceipts[fileName as keyof Receipt] = this.receipt;
//   localStorage.receiptBank01=JSON.stringify(dictReceipts);
// }
// Date
