import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { CamerasComponent } from './cameras.component';

const routes: Routes = [
  {
    path: '', 
    component: CamerasComponent,
    children: [
      {
        path: 'camera', 
        component: CameraComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamerasRoutingModule { }
