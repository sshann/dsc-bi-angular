import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {ReportComponent} from './report/report.component';
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
import {ExportComponent} from './export/export.component';
import {ProductFormDialogComponent} from './product-data/product-form-dialog/product-form-dialog.component';
import {ProductByDayGraphComponent} from './product-data/product-by-day-graph/product-by-day-graph.component';
import {EmployeeByMonthGraphComponent} from './employee-data/employee-by-month-graph/employee-by-month-graph.component';
import {EmployeeFormDialogComponent} from './employee-data/employee-form-dialog/employee-form-dialog.component';
import {ImportDialogComponent} from './import/import-dialog.component';

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
    ImportDialogComponent,
    EmployeeDataComponent,
    EmployeeByMonthGraphComponent,
    EmployeeFormDialogComponent,
    TransactionDataComponent,
    TransactionByDayGraphComponent,
    TransactionFormDialogComponent,
    ProductDataComponent,
    ProductFormDialogComponent,
    ProductByDayGraphComponent,
    ExportComponent
  ],
  entryComponents: [
    TransactionFormDialogComponent,
    ProductFormDialogComponent,
    EmployeeFormDialogComponent,
    ImportDialogComponent
  ],
  exports: [
    TransactionByDayGraphComponent,
    ProductByDayGraphComponent
  ]
})
export class DataPanelModule {
}
