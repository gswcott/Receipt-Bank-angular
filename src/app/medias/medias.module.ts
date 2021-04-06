import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediasRoutingModule } from './medias-routing.module';
import { MediasComponent } from './medias.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MediasComponent],
  imports: [
    CommonModule,
    MediasRoutingModule,
    SharedModule
  ],
  exports: [
    MediasComponent
  ]
})
export class MediasModule { }
