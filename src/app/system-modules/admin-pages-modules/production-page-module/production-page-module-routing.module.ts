import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// My Component
import { HomeProductionComponent } from '../../../admin-pages/production-page/home-production/home-production.component';
import { AddProductionComponent } from '../../../admin-pages/production-page/add-production/add-production.component';

export const routes: Routes = [
    {
        path: '', component: HomeProductionComponent , children:
        [
          {path: '', component: AddProductionComponent}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionPageModuleRoutingModule { }
