import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {EmployeeDataComponent} from './employee-data/employee-data.component';
import {TransactionDataComponent} from './transaction-data/transaction-data.component';
import {ProductDataComponent} from './product-data/product-data.component';
import {ReportComponent} from './report/report.component';
import {ImportComponent} from './import/import.component';

const routes: Routes = [
  {path: 'data', component: DataPanelComponent, canActivate: [AuthGuard]},
  {
    path: 'data/employee', children: [
      {path: '', component: EmployeeDataComponent}
    ]
  },
  {
    path: 'data/product', children: [
      {path: '', component: ProductDataComponent}
    ]
  },
  {
    path: 'data/transaction', children: [
      {path: '', component: TransactionDataComponent}
    ]
  },
  {path: 'data/export', component: ReportComponent},
  {path: 'data/import', component: ImportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {

}
