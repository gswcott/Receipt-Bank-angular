import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }
  startLoading(){
    return true;
  }
  stopLoading(){
    return false;
  }
}
