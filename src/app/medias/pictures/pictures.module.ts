import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PicturesRoutingModule } from './pictures-routing.module';
import { PictureComponent } from './picture/picture.component';
import { PicturesComponent } from './pictures.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PictureComponent, PicturesComponent],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    SharedModule
  ],
  exports: [
    PicturesComponent,
    PictureComponent,
  ]
})
export class PicturesModule { }
