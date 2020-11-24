import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAcreComponent } from '../../../admin-pages/acre/add-acre/add-acre.component';
import { HomeAcreComponent } from '../../../admin-pages/acre/home-acre/home-acre.component';
import { RestoreAcreComponent } from '../../../admin-pages/acre/restore-acre/restore-acre.component';
import { ShowAllAcreComponent } from '../../../admin-pages/acre/show-all-acre/show-all-acre.component';

export const routes: Routes = [
  {
     path: '', component: HomeAcreComponent, children: [
            { path: '', component: ShowAllAcreComponent },
            { path: 'addAcre', component: AddAcreComponent },
            { path: 'showAllAcre', component: ShowAllAcreComponent },
            { path: 'restoreAcre', component: RestoreAcreComponent }
        ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcreModuleRoutingModule { }
