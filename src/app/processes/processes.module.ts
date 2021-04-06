import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessesComponent } from './processes.component';
import { ResultComponent } from './result/result.component';
import { ReceiptsModule } from '../receipts/receipts.module';
import { FormComponent } from './form/form.component';
import { PicturesModule } from '../medias/pictures/pictures.module';
import { ProcessesRoutingModule } from './processes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProcessesComponent, FormComponent, ResultComponent],
  imports: [
    CommonModule,
    PicturesModule,
    ProcessesRoutingModule,
    ReceiptsModule,
    SharedModule
  ],
  exports:[
    ProcessesComponent,
    FormComponent,
    ResultComponent
  ]
})
export class ProcessesModule { }
