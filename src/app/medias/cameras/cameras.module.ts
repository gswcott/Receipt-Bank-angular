import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CameraComponent } from './camera/camera.component';
import { CamerasComponent } from './cameras.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutorizationModalComponent } from './autorization-modal/autorization-modal.component';


@NgModule({
  declarations: [CameraComponent, CamerasComponent, AutorizationModalComponent],
  imports: [
    CommonModule,
    CamerasRoutingModule, 
    SharedModule
  ],
  exports: [
    CamerasComponent, 
    CameraComponent
  ]
})
export class CamerasModule { }
