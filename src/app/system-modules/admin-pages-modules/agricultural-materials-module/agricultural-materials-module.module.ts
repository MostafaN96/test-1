import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriculturalMaterialsModuleRoutingModule } from './agricultural-materials-module-routing.module';

import { AddAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/add-agricultural-materials/add-agricultural-materials.component';
import { HomeAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/home-agricultural-materials/home-agricultural-materials.component';
import { RestoreAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/restore-agricultural-materials/restore-agricultural-materials.component';
import { ShowAllAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/show-all-agricultural-materials/show-all-agricultural-materials.component';

import { SharedModule } from '../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AddAgriculturalMaterialsComponent,
    HomeAgriculturalMaterialsComponent,
    RestoreAgriculturalMaterialsComponent,
    ShowAllAgriculturalMaterialsComponent
  ],
  imports: [
    SharedModule,
    AgriculturalMaterialsModuleRoutingModule
  ]
})
export class AgriculturalMaterialsModuleModule { }
