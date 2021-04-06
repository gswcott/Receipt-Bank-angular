import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediasComponent } from './medias.component';

const routes: Routes = [
  {
    path: '', 
    component: MediasComponent, 
    children: [
      {
        path: 'cameras',
        loadChildren: () => import('./cameras/cameras.module').then(m => m.CamerasModule)
      }, 
      {
        path: 'pictures',
        loadChildren: () => import('./pictures/pictures.module').then(m => m.PicturesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediasRoutingModule { }
