import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../shared/interceptors/authorization.interceptor';
import {UserService} from '../auth/user.service';
import {HomeComponent} from './home/home.component';
import {CompanyService} from '../companies/company.service';
import {CompaniesModule} from '../companies/companies.module';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {DataPanelModule} from '../data-panel/data-panel.module';
import {EmployeeDataService} from '../data-panel/employee-data/employee-data.service';
import {ProductDataService} from '../data-panel/product-data/product-data.service';
import {TransactionDataService} from '../data-panel/transaction-data/transaction-data.service';
import {AuthModule} from '../auth/auth.module';
import {HTTPListener, HTTPStatus} from '../shared/interceptors/loader.interceptor';
import {SharedModule} from '../shared/shared.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {LoadingService} from '../shared/loading.service';
import {AdminGuard} from '../auth/guards/admin-guard.service';
import {BusinessManagerGuard} from '../auth/guards/business-manager-guard.service';
import {BusinessOwnerGuard} from '../auth/guards/business-owner-guard.service';
import {ProfileModule} from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AuthModule,
    CompaniesModule,
    DataPanelModule,
    SharedModule,
    DashboardModule,
    ProfileModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    BusinessManagerGuard,
    BusinessOwnerGuard,
    UserService,
    CompanyService,
    EmployeeDataService,
    ProductDataService,
    TransactionDataService,
    HTTPListener,
    HTTPStatus,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    }
  ]
})
export class CoreModule {
}
