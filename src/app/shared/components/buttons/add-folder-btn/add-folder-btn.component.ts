import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FolderService } from 'src/app/shared/services/folder.service';
import * as M from 'materialize-css';
import { FolderListComponent } from 'src/app/receipts/folder-list/folder-list.component';
import { Folder } from 'src/app/shared/models/folder.model';

@Component({
  selector: 'app-add-folder-btn',
  templateUrl: './add-folder-btn.component.html',
  styleUrls: ['./add-folder-btn.component.scss']
})
export class AddFolderBtnComponent implements OnInit {
  @ViewChild("myModal") myModal: ElementRef = new ElementRef(null);
  @ViewChild("myInput") myInput: ElementRef = new ElementRef(null);
  public newFolderName: string = "";
  public newFolderNameTrim: string = "";
  public errorMessage: string = "";
  public folderList: Folder[] = [];
  constructor(private folderService: FolderService) {
  }
  changeErrorMessage(){
    this.newFolderNameTrim = this.newFolderName.trim();
    // this.folderList = this.folderService.getFolderList();
    // this.folderService.getSubject().subscribe((folderList: Folder[]) =>{
    //   this.folderList = folderList;
    // })
    const foundRes = this.folderService.findFolder(this.newFolderNameTrim);
    if(foundRes){
      this.errorMessage = "The name already exists, please change it."
    }else{
      this.errorMessage = "";
    }
  }
  createNewFolder(){
    this.folderService.addFolder(this.newFolderNameTrim);
  }

  // openModal(): void {
  //   const modal = M.Modal.init(this.myModal.nativeElement);
  //   modal.open();
  //   M.Autocomplete.init(this.myInput.nativeElement, {minLength: 0});
  // }

  ngOnInit(): void {
    M.AutoInit();
  }

}
