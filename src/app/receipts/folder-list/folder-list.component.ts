import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/shared/models/folder.model';
import { FolderService } from 'src/app/shared/services/folder.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  @ViewChild("myModal") myModal: ElementRef = new ElementRef(null);
  @ViewChild("myInput") myInput: ElementRef = new ElementRef(null);
  public folderList: Folder[] = [];
  public newFolderName: string = "";
  public newFolderNameTrim: string = "";
  public errorMessage: string = "";
  constructor(private router: Router, private folderService: FolderService) {
    this.folderList = this.folderService.getFolderList();
    this.folderService.getSubject().subscribe((folderList: Folder[]) =>{
      this.folderList = folderList;
    })
  }
  goToReceiptList(folderName: string){
    this.router.navigate(["receipts", "receipt-list",  folderName]);
  }

  deleteFolder(folderName: string){
    this.folderService.deleteFolder(folderName);
  }
  goToCamera() {
    this.router.navigate(["medias", "cameras", "camera"]);
  }
  changeErrorMessage(){
    this.newFolderNameTrim = this.newFolderName.trim();
    const foundRes = this.folderService.findFolder(this.newFolderNameTrim);
    if(foundRes){
      this.errorMessage = "The name already exists, please change it."
    }else{
      this.errorMessage = "";
    }
  }
  addFolder(){
    this.folderService.addFolder(this.newFolderNameTrim);
  }


  ngOnInit(): void {
    M.AutoInit();
  }
}
