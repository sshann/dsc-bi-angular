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
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataRoutingModule} from './data-routing.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {TransactionLineGraphComponent} from './transaction-data/transaction-line-graph/transaction-line-graph.component';

@NgModule({
  imports: [
    CommonModule,
    DataRoutingModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
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
    TransactionLineGraphComponent]
})
export class DataPanelModule {
}
