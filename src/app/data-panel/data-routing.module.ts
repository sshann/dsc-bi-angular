import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataPanelComponent} from './data-panel/data-panel.component';

const routes: Routes = [
  {path: 'data', component: DataPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {

}
