import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataPanelComponent} from './data-panel/data-panel.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {EmployeeDataComponent} from './employee-data/employee-data.component';
import {TransactionDataComponent} from './transaction-data/transaction-data.component';
import {ProductDataComponent} from './product-data/product-data.component';
import {ReportComponent} from './report/report.component';
import {ImportComponent} from './import/import.component';
import {AdminGuard} from '../auth/guards/admin-guard.service';
import {BusinessOwnerGuard} from '../auth/guards/business-owner-guard.service';
import {BusinessManagerGuard} from '../auth/guards/business-manager-guard.service';

const routes: Routes = [
  {
    path: 'data',
    component: DataPanelComponent,
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard]
  },
  {
    path: 'data/employee',
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard],
    children: [
      {path: '', component: EmployeeDataComponent}
    ]
  },
  {
    path: 'data/product',
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard],
    children: [
      {path: '', component: ProductDataComponent}
    ]
  },
  {
    path: 'data/transaction',
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard],
    children: [
      {path: '', component: TransactionDataComponent}
    ]
  },
  {
    path: 'data/export',
    component: ReportComponent,
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard]
  },
  {
    path: 'data/import',
    component: ImportComponent,
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {

}
