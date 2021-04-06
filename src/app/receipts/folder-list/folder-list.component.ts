import { Component, Input, OnInit } from '@angular/core';
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
  public folderList: Folder[] = [];
  constructor(private router: Router, private folderService: FolderService) {
    // var ratio = window.devicePixelRatio || 1;
    // var w = screen.width * ratio;
    // var h = screen.height * ratio;
    // alert("taille: " + w + "," + h);
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

  ngOnInit(): void {
    M.AutoInit();
  }
}
