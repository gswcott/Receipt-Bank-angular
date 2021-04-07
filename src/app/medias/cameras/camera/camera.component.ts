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
  @ViewChild("myModal") myModal!: ElementRef;
  public isLoading: boolean = false;
  public cameraAutorized: boolean = false;
  constructor(private router: Router, private pictureService: PictureService, private cameraService: CameraService) {
  }
  ngOnInit(): void {
    M.AutoInit();
  }
  ngAfterViewInit(): void{
    this.activateCamera();
  }
  activateCamera(){
    if (window["cordova"]) {;
      this.grantPermission();
    } else {
      this.startCamera();
    }
  }
  grantPermission() {
    window["cordova"].plugins.diagnostic.requestRuntimePermission(
      (status) => status == window["cordova"].plugins.diagnostic.permissionStatus.GRANTED
        ? this.startCamera()
        : this.openModal(),
      () => alert('Camera error'),
      "CAMERA"
    );
  }
  startCamera(){
    this.cameraService.startCamera().subscribe(
      (camera: Camera) =>{
        if(!camera.stream.active){
          this.cameraAutorized = false;
          this.isLoading = false;
          this.openModal();
          return;
        }
        this.cameraAutorized = true;
        this.isLoading = true;
        this.myVideo.nativeElement.onloadedmetadata = () => {
          this.myVideo.nativeElement.play();
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
  openModal(){
    const modal = M.Modal.init(this.myModal.nativeElement);
    modal.open();
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
  goToHome(){
    this.router.navigate(["receipts", "folder-list"]);
  }

}

