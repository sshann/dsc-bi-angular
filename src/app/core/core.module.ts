import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule {
}
