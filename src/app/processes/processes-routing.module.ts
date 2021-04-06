import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ProcessesComponent } from './processes.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessesComponent,
    children: [
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessesRoutingModule {}
