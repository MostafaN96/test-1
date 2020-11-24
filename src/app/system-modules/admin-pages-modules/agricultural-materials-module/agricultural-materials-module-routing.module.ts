import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/add-agricultural-materials/add-agricultural-materials.component';
import { HomeAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/home-agricultural-materials/home-agricultural-materials.component';
import { RestoreAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/restore-agricultural-materials/restore-agricultural-materials.component';
import { ShowAllAgriculturalMaterialsComponent } from '../../../admin-pages/agriculturalMaterials/show-all-agricultural-materials/show-all-agricultural-materials.component';

export const routes: Routes = [
  {
     path: '', component: HomeAgriculturalMaterialsComponent, children: [
            { path: '', component: ShowAllAgriculturalMaterialsComponent },
            { path: 'addAgriculturalMaterials', component: AddAgriculturalMaterialsComponent },
            { path: 'showAllAgriculturalMaterials', component: ShowAllAgriculturalMaterialsComponent },
            { path: 'restoreAgriculturalMaterials', component: RestoreAgriculturalMaterialsComponent }
        ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriculturalMaterialsModuleRoutingModule { }
