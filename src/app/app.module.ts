import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularMaterialModule} from './angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './/app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CompaniesModule} from './companies/companies.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
	CompaniesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
