import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../shared/authorization.interceptor';
import {UserService} from '../auth/user.service';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {DataPanelModule} from '../data-panel/data-panel.module';
import {EmployeeDataService} from '../data-panel/employee-data/employee-data.service';
import {ProductDataService} from '../data-panel/product-data/product-data.service';
import {TransactionDataService} from '../data-panel/transaction-data/transaction-data.service';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AuthModule,
    DataPanelModule
  ],
  declarations: [HeaderComponent, HomeComponent],
  exports: [
    HeaderComponent
  ],
  providers: [
    AuthGuard,
    UserService,
    EmployeeDataService,
    ProductDataService,
    TransactionDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
