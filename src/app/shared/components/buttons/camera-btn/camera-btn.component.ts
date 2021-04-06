import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-btn',
  templateUrl: './camera-btn.component.html',
  styleUrls: ['./camera-btn.component.scss']
})
export class CameraBtnComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}


