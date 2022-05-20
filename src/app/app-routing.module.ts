import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { InputFieldsComponent } from './input-fields/input-fields.component';

const routes: Routes = [
  { path: '', component: InputFieldsComponent },
  { path: 'detail/:order_number', component: DetailFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }