import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {ReportComponent} from './report/report.component';
import {ImportComponent} from './import/import.component';
import {EmployeeDataComponent} from './employee-data/employee-data.component';
import {TransactionDataComponent} from './transaction-data/transaction-data.component';
import {ProductDataComponent} from './product-data/product-data.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularMaterialModule} from '../angular_material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataRoutingModule} from './data-routing.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TransactionByDayGraphComponent} from './transaction-data/transaction-by-day-graph/transaction-by-day-graph.component';
import {TransactionFormDialogComponent} from './transaction-data/transaction-form-dialog/transaction-form-dialog.component';
import {ProductFormDialogComponent} from './product-data/product-form-dialog/product-form-dialog.component';
import {ProductByDayGraphComponent} from './product-data/product-by-day-graph/product-by-day-graph.component';

@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  declarations: [
    DataPanelComponent,
    ReportComponent,
    ImportComponent,
    EmployeeDataComponent,
    TransactionDataComponent,
    ProductDataComponent,
    TransactionByDayGraphComponent,
    TransactionFormDialogComponent,
    ProductDataComponent,
    ProductFormDialogComponent,
    ProductByDayGraphComponent
  ],
  entryComponents: [
    TransactionFormDialogComponent,
    ProductFormDialogComponent
  ],
  exports: [
    TransactionByDayGraphComponent,
    ProductByDayGraphComponent
  ]
})
export class DataPanelModule {
}
