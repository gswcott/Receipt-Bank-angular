import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from 'src/app/shared/models/camera.model';
import { CameraService } from 'src/app/shared/services/camera.service';
import { PictureService } from 'src/app/shared/services/picture.service';
import * as M from 'materialize-css';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, AfterViewInit {
  @ViewChild("myVideo") myVideo!: ElementRef;
  public isLoading: boolean = true;
  public havingError: boolean = false;
  public videoWidth: number = 320;
  public videoHeight: number = 0;
  constructor(private router: Router, private pictureService: PictureService, private cameraService: CameraService) {
  }
  takePicture(elemCan: HTMLCanvasElement, elemVideo: HTMLVideoElement) {
    elemCan.width = elemVideo.videoWidth;
    elemCan.height = elemVideo.videoHeight;
    elemCan.getContext("2d")?.drawImage(elemVideo, 0, 0, elemCan.width, elemCan.height);
    this.pictureService.setSrcValue(elemCan.toDataURL("image/png"));
    this.goToPicture();
  }
  goToPicture() {
    this.router.navigate(["medias", "pictures", "picture"]);
  }
  ngOnInit(): void {
    M.AutoInit();
  }
  activeCamera(){
    this.cameraService.activeCamera().subscribe(
      (camera: Camera) =>{
        this.havingError = camera.havingError;
        if(camera.havingError){
          this.isLoading = false;
          return;
        }
        this.myVideo.nativeElement.onloadedmetadata = () => {
          this.myVideo.nativeElement.play();
          const wi = this.myVideo.nativeElement.videoWidth;
          const hi = this.myVideo.nativeElement.videoHeight;
          const ri = wi/hi;
          const rs = screen.width/screen.height;
          if(rs>ri) {
            this.videoWidth = wi*screen.height/hi;
            this.videoHeight = screen.height;
          }else{
            this.videoWidth = screen.width;
            this.videoHeight = hi*screen.width/wi;
          }
          alert("finally "+this.videoWidth + "," + this.videoHeight);
          this.isLoading = false;
        };
        if ("srcObject" in this.myVideo.nativeElement) {
          this.myVideo.nativeElement.srcObject = camera.stream;
        } else {
          this.myVideo.nativeElement.src = window.URL.createObjectURL(camera.stream);
        }
      },
      () =>{
      }
    )
  }
  grantPermission() {
    window["cordova"].plugins.diagnostic.requestRuntimePermission(
      (status) => status == window["cordova"].plugins.diagnostic.permissionStatus.GRANTED
        ? this.activeCamera()
        : alert('Need authorization'),
      () => alert('Camera error'),
      "CAMERA"
    );
  }
  ngAfterViewInit(): void{
    this.isLoading = true;
    if (window["cordova"]) {;
      this.grantPermission();
    } else {
      this.activeCamera();
    }
  }
}

// public top: number = 0;
// public left: number = 0;
// this.top = (screen.height-this.videoHeight)/2;
// this.left = (screen.width-this.videoWidth)/2;
