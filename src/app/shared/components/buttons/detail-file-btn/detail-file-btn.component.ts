import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-file-btn',
  templateUrl: './detail-file-btn.component.html',
  styleUrls: ['./detail-file-btn.component.scss']
})
export class DetailFileBtnComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

}
