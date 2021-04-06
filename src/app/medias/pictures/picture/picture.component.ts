import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Picture } from 'src/app/shared/models/picture.model';
import { PictureService } from 'src/app/shared/services/picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit{
  @ViewChild("myImage") myImage!: ElementRef;
  public picture: Picture;
  // public top: number = 50;
  // public left: number = 0;
  constructor(private router: Router, private pictureSerivce: PictureService) {
    this.picture = this.pictureSerivce.getPicture();
    this.pictureSerivce.getSubject().subscribe((picture:Picture)=>
    {
      this.picture = picture;
    }, ()=>{});
  }
  goToCamera(){
    this.router.navigate(["medias", "cameras", "camera"]);
  }
  goToForm(){
    this.router.navigate(["processes", "form"]);
  }

  ngOnInit(): void {
    // this.top = (screen.height- this.myImage.nativeElement.height)/2;
    // this.left = (screen.width- this.myImage.nativeElement.width)/2;
    // console.log(this.top);
  }
}
