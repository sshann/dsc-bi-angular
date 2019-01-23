import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular_material.module';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import {HttpClientModule} from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
