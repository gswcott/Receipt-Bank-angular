import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'import-photos',
    loadChildren: () => import('./import-photos/import-photos.module').then(m => m.ImportPhotosModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./receipts/receipts.module').then(m => m.ReceiptsModule)
  },
  {
    path: 'medias',
    loadChildren: () => import('./medias/medias.module').then(m => m.MediasModule)
  },
  {
    path: 'processes',
    loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '**',
    redirectTo: "receipts/folder-list"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
