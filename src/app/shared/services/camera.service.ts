import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public camera: Camera = new Camera();
  private constraints: any;
  private subject: Subject<Camera> = new Subject();
  constructor() {
    this.constraints = {
      audio: false,
      video: {
        width: 1280,
        height: 720
      }
    };
    if (window["cordova"]){
      this.constraints = {
        audio: false,
        video: {
          width: 1280,
          height: 720,
          facingMode: {exact: "environment"}
        }
      }
    }
  }
  activeCamera(): Subject<Camera> {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then((stream) => {
        this.camera = new Camera();
        this.camera.stream = stream;
        this.subject.next(this.camera);
      })
      .catch((err) => {
        this.camera = new Camera();
        this.camera.havingError = true;
        this.subject.next(this.camera);
      });
    return this.subject;
  }
}
