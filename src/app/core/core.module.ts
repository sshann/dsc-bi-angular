import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../shared/authorization.interceptor';
import {UserService} from '../auth/user.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  declarations: [HeaderComponent, HomeComponent],
  exports: [
    HeaderComponent
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
