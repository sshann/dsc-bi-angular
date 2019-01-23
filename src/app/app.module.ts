import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularMaterialModule} from './angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './/app-routing.module';
import {LoginComponent} from './auth/login/login.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './user.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptorService} from './authorization-interceptor.service';
import {LogoutComponent} from './auth/logout/logout.component';
import {AuthModule} from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    FlexLayoutModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
