import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { CompanylistComponent } from './companylist/companylist.component';

const routes: Routes = [
  {path: 'companies', component: CompanylistComponent},

];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forRoot(routes),
  ],
  declarations: []
})
export class CompRoutingModule { }
