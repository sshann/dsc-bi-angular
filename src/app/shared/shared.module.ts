import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteConfirmationComponent} from './dialog/delete-confirmation/delete-confirmation.component';
import {AngularMaterialModule} from '../angular_material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [DeleteConfirmationComponent],
  exports: [],
  entryComponents: [DeleteConfirmationComponent]
})
export class SharedModule {
}
