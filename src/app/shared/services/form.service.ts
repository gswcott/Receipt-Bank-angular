import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private form: Form = new Form();
  constructor() { }
  setForm(form: Form){
    this.form = form;
  }
  getForm(){
    return this.form;
  }
}
