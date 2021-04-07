import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Picture } from 'src/app/shared/models/picture.model';
import { PictureService } from 'src/app/shared/services/picture.service';

@Component({
  selector: 'app-import-photo',
  templateUrl: './import-photo.component.html',
  styleUrls: ['./import-photo.component.scss']
})
export class ImportPhotoComponent implements OnInit {
  @ViewChild("myInput") myInput!: ElementRef;
  @ViewChild("myImage") myImage!: ElementRef;
  public selectedFile: any = null;
  public file: any = null;
  public picture: Picture = new Picture();
  constructor(private router: Router, private pictureService: PictureService) { }

  handleFile(newValue: any) {
    this.file = this.myInput.nativeElement.files[0];
    if (this.file.type.startsWith('image/')) {
      this.myImage.nativeElement.file = this.file;
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        this.myImage.nativeElement.src = (e.target as FileReader).result;
      };
      reader.readAsDataURL(this.file);
    }
  }
  validate() {
    this.pictureService.setSrcValue(this.myImage.nativeElement.src);
    this.router.navigate(["processes", "form"])
  }
  ngOnInit(): void {
  }
}
