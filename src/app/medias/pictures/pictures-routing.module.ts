import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureComponent } from './picture/picture.component';
import { PicturesComponent } from './pictures.component';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent,
    children: [
      {
        path: 'picture',
        component: PictureComponent,
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicturesRoutingModule {}
