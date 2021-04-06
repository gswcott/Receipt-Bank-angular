import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// pour activer Materialize (dois se faire sur chaque composant qui en a besoin)
import * as M from 'materialize-css';
import { PictureService } from '../../services/picture.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // @ViewChild("myInput") myInput!: ElementRef;
  // public selectedFile: any = null;
  // public file: any = null;
  constructor(private router: Router, private pictureService: PictureService) { }
  ngOnInit(): void {
    M.AutoInit();
  }
  // handleFile(newValue: any) {
  //   console.log(newValue);
  //   this.file = this.myInput.nativeElement.files[0];
  //   //console.log("hello", this.file);
  //   if (this.file.type.startsWith('image/')) {
  //     const reader = new FileReader();
  //     reader.onload = (e: Event) => {
  //       this.pictureService.setSrcValue((e.target as FileReader).result);
  //     };
  //     reader.readAsDataURL(this.file);
  //   }
  // }
  goToPicture() {
    this.router.navigate(["medias", "pictures", "picture"]);
  }

  goToFolderList(){
    this.router.navigate(["receipts", "folder-list"]);
  }
  goToImport() {
    this.router.navigate(["import-photos", "import"]);
  }

}
