import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CompanylistComponent} from './companylist/companylist.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {AdminGuard} from '../auth/guards/admin-guard.service';
import {CompanyComponent} from './company/company.component';

const routes: Routes = [
  {path: 'companies-old', component: CompanylistComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'companies', component: CompanyComponent, canActivate: [AuthGuard, AdminGuard]}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class CompRoutingModule {
}
