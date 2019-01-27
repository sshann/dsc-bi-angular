import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule, MatTooltipModule
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
  MatIconModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTooltipModule
];

@NgModule({
  imports: materialComponents,
  exports: materialComponents,
})
export class AngularMaterialModule {
}
