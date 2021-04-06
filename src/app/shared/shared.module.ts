import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeleteBtnComponent } from './components/buttons/delete-btn/delete-btn.component';
import { CameraBtnComponent } from './components/buttons/camera-btn/camera-btn.component';
import { DetailFileBtnComponent } from './components/buttons/detail-file-btn/detail-file-btn.component';
import { AddFolderBtnComponent } from './components/buttons/add-folder-btn/add-folder-btn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { DownloadBtnComponent } from './components/buttons/download-btn/download-btn.component';
import { ShareBtnComponent } from './components/buttons/share-btn/share-btn.component';
import { ValidateBtnComponent } from './components/buttons/validate-btn/validate-btn.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [NavbarComponent, DeleteBtnComponent, CameraBtnComponent, DetailFileBtnComponent,
     AddFolderBtnComponent, DownloadBtnComponent, ShareBtnComponent, ValidateBtnComponent,  LoadingComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    DeleteBtnComponent,
    CameraBtnComponent,
    DetailFileBtnComponent,
    AddFolderBtnComponent,
    DownloadBtnComponent,
    ShareBtnComponent,
    ValidateBtnComponent,
    LoadingComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
