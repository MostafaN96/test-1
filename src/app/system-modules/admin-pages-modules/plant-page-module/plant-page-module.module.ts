import { NgModule } from '@angular/core';

import { PlantPageModuleRoutingModule } from './plant-page-module-routing.module';

// Component
import { AddPlantComponent } from '../../../admin-pages/plant-page/add-plant/add-plant.component';

// Shared Module
import { SharedModule } from '../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AddPlantComponent
  ],
  imports: [
    PlantPageModuleRoutingModule,
    SharedModule
  ]
})
export class PlantPageModuleModule { }
