import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserFormDialogComponent} from './user-form-dialog/user-form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    UserFormDialogComponent
  ],
  entryComponents: [
    UserFormDialogComponent
  ]
})
export class AuthModule {
}
