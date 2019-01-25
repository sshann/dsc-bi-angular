import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {ReportComponent} from './report/report.component';
import {ImportComponent} from './import/import.component';
import {EmployeeDataComponent} from './employee-data/employee-data.component';
import {TransactionDataComponent} from './transaction-data/transaction-data.component';
import {ProductDataComponent} from './product-data/product-data.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataPanelComponent,
    ReportComponent,
    ImportComponent,
    EmployeeDataComponent,
    TransactionDataComponent,
    ProductDataComponent]
})
export class DataPanelModule {
}
