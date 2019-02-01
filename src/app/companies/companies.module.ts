import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompRoutingModule} from './comp-routing.module';
import {CompanylistComponent} from './companylist/companylist.component';
import {HttpClientModule} from '@angular/common/http';
import {CompanyComponent} from './company/company.component';
import {CompanyFormDialogComponent} from './company/company-form-dialog/company-form-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularMaterialModule} from '../angular_material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { CompanyManagementComponent } from './company-management/company-management.component';

@NgModule({
  imports: [
    CommonModule,
    CompRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanylistComponent,
    CompanyComponent,
    CompanyFormDialogComponent,
    CompanyManagementComponent
  ],
  entryComponents: [
    CompanyFormDialogComponent
  ]
})
export class CompaniesModule {
}
