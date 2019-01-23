import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular_material.module';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthorizationInterceptorService } from './authorization-interceptor.service'
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
  providers: [UserService, 
  {
	  provide: HTTP_INTERCEPTORS,
	  useClass: AuthorizationInterceptorService,
	  multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
