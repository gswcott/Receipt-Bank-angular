import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Folder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folderList: Folder[] = [];
  private subject: Subject<Folder[]> = new Subject();
  constructor() {
    this.addFolder("Received");
    this.addFolder("Issued");
  }
  getSubject(): Subject<Folder[]>{
    return this.subject;
  }

  getFolderList(){
    return this.folderList;
  }

  findFolder(name: string){
    return this.folderList.find(element => element.name === name);
  }

  addFolder(name: string){
    const folder: Folder = new Folder();
    folder.name = name;
    this.folderList.push(folder);
    this.subject.next(this.folderList);
  }

  deleteFolder(name: string){
    const index = this.folderList.findIndex(element => element.name === name);
    this.folderList.splice(index, 1);
    this.subject.next(this.folderList);
  }
}
