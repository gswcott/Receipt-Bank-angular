import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Picture } from '../models/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private picture: Picture = new Picture();
  private subject: Subject<Picture> = new Subject();
  constructor() {
    console.log("Le service de Picture est construit");
  }
  getSubject(): Subject<Picture>{
    return this.subject;
  }
  getPicture() {
    return this.picture;
  }
  setSrcValue(value: any) {
    this.picture.src = value;
    this.subject.next(this.picture);
  }
}
