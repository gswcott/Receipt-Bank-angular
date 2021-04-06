import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportPhotosRoutingModule } from './import-photos-routing.module';
import { ImportPhotoComponent } from './import-photo/import-photo.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ImportPhotoComponent],
  imports: [
    CommonModule,
    ImportPhotosRoutingModule,
    SharedModule,
  ]
})
export class ImportPhotosModule { }
