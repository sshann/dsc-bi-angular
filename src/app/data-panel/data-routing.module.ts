import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {EmployeeDataComponent} from './employee-data/employee-data.component';
import {TransactionDataComponent} from './transaction-data/transaction-data.component';
import {ProductDataComponent} from './product-data/product-data.component';
import {ReportComponent} from './report/report.component';
import {ImportComponent} from './import/import.component';
import {ExportComponent} from './export/export.component';
import {BusinessManagerGuard} from '../auth/guards/business-manager-guard.service';
import {BusinessOwnerGuard} from '../auth/guards/business-owner-guard.service';
import {AdminGuard} from '../auth/guards/admin-guard.service';

const routes: Routes = [
  {
    path: 'data',
    component: DataPanelComponent,
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard]
  },
  {
    path: 'data/employee',
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard],
    children: [
      {path: '', component: EmployeeDataComponent}
    ]
  },
  {
    path: 'data/product',
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard],
    children: [
      {path: '', component: ProductDataComponent}
    ]
  },
  {
    path: 'data/transaction',
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard],
    children: [
      {path: '', component: TransactionDataComponent}
    ]
  },
  {
    path: 'data/export',
    component: ExportComponent,
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard]
  },
  {
    path: 'data/import',
    component: ImportComponent,
    canActivate: [AuthGuard, BusinessManagerGuard || BusinessOwnerGuard || AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {

}
