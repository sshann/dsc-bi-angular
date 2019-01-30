import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CompanylistComponent} from './companylist/companylist.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {AdminGuard} from '../auth/guards/admin-guard.service';

const routes: Routes = [
  {path: 'companies', component: CompanylistComponent, canActivate: [AuthGuard, AdminGuard]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class CompRoutingModule {
}
