import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../auth/guards/auth-guard.service';
import {AdminGuard} from '../auth/guards/admin-guard.service';
import {BusinessOwnerGuard} from '../auth/guards/business-owner-guard.service';
import {BusinessManagerGuard} from '../auth/guards/business-manager-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard, BusinessOwnerGuard, BusinessManagerGuard]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class DashboardRoutingModule {
}
