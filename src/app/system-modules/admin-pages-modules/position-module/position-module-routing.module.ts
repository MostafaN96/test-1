import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPositionComponent } from '../../../admin-pages/position/add-position/add-position.component';
import { HomePositionComponent } from '../../../admin-pages/position/home-position/home-position.component';
import { RestorePositionComponent } from '../../../admin-pages/position/restore-position/restore-position.component';
import { ShowAllPositionComponent } from '../../../admin-pages/position/show-all-position/show-all-position.component';

export const routes: Routes = [
  {
     path: '', component: HomePositionComponent, children: [
            { path: '', component: ShowAllPositionComponent },
            { path: 'addPosition', component: AddPositionComponent },
            { path: 'showAllPosition', component: ShowAllPositionComponent },
            { path: 'restorePosition', component: RestorePositionComponent }
        ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionModuleRoutingModule { }
