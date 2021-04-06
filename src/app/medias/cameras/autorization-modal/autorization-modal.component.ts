import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as M from 'materialize-css';
@Component({
  selector: 'app-autorization-modal',
  templateUrl: './autorization-modal.component.html',
  styleUrls: ['./autorization-modal.component.scss']
})
export class AutorizationModalComponent implements OnInit, AfterViewInit{
  @ViewChild("myModal") myModal: ElementRef = new ElementRef(null);
  constructor() { }
  ngAfterViewInit(): void {
    const modal = M.Modal.init(this.myModal.nativeElement);
    modal.open();
  }
  ngOnInit(): void {
    //M.AutoInit();
  }

}
