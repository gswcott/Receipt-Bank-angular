import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/shared/models/folder.model';
import { Form } from 'src/app/shared/models/form.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { FolderService } from 'src/app/shared/services/folder.service';
import { FormService } from 'src/app/shared/services/form.service';
import { PictureService } from 'src/app/shared/services/picture.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public picture: Picture = new Picture();
  public folderList: Folder[];
  public form: Form = new Form();
  public newFileName: string = "";
  public errorList: {}={}
  public errorMessage: string = "Please choose one of the options";
  public errorMessageFileName: string = "Please name your file";
  constructor(private router: Router, private formService: FormService, private pictureSerivce: PictureService, private folderService: FolderService) {
    this.picture = this.pictureSerivce.getPicture();
    this.pictureSerivce.getSubject().subscribe((picture:Picture)=>
    {
      this.picture = picture;
    }, ()=>{});
    Object.keys(this.form).forEach(key=>{
      this.errorList[key] = false;
    })
    this.folderList = this.folderService.getFolderList();
    this.folderService.getSubject().subscribe((folderList: Folder[])=>{
      this.folderList = folderList;
    },()=>{})
  }
  validate(){
    Object.keys(this.form).forEach(key=>{
      if(this.form[key]){
        this.errorList[key] = false;
      }else{
        this.errorList[key] = true;
      }
    })
    const res=Object.values(this.errorList).every(value => value == false);
    if(res){
      this.formService.setForm(this.form);
      this.router.navigate(["processes", "result"]);
    }
  }
  ngOnInit(): void {

  }

}
