import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatProgressBarModule, MatRippleModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

const materialComponents = [
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatRippleModule,
  MatProgressBarModule,
  MatIconModule
];

@NgModule({
  imports: materialComponents,
  exports: materialComponents,
})
export class AngularMaterialModule {
}
