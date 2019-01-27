import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompRoutingModule } from './comp-routing.module';
import { CompanylistComponent } from './companylist/companylist.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
	CompRoutingModule,
	HttpClientModule,
	
  ],
  declarations: [CompanylistComponent]
})
export class CompaniesModule { 
}
