import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// My Component
import { AddPlantComponent } from '../../../admin-pages/plant-page/add-plant/add-plant.component';

export const routes: Routes = [
    {
        path: '', component: AddPlantComponent
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantPageModuleRoutingModule { }
