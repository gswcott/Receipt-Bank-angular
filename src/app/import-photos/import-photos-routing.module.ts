import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportPhotoComponent } from './import-photo/import-photo.component';

const routes: Routes = [
  {
    path: '',
    component: ImportPhotoComponent,
    children: [{
      path: "import",
      component: ImportPhotoComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportPhotosRoutingModule { }
