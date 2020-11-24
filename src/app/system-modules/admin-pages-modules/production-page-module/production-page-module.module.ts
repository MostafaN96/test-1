import { NgModule } from '@angular/core';

import { ProductionPageModuleRoutingModule } from './production-page-module-routing.module';

// Component
import { HomeProductionComponent } from '../../../admin-pages/production-page/home-production/home-production.component';
import { AddProductionComponent } from '../../../admin-pages/production-page/add-production/add-production.component';

// Shared Module
import { SharedModule } from '../../../shared-modues/shared/shared.module';


@NgModule({
  declarations: [
    AddProductionComponent,
    HomeProductionComponent
  ],
  imports: [
    ProductionPageModuleRoutingModule,
    SharedModule
  ]
})
export class ProductionPageModuleModule { }
