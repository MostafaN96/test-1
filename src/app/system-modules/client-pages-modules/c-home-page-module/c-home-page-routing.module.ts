import { NgModule } from '@angular/core';

// Routing
import { Routes, RouterModule } from '@angular/router';

// My Component
import { CHomePageComponent } from '../../../client-pages/c-home-page/c-home-page.component';

export const routes: Routes = [
    {
        path: '', component: CHomePageComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class CHomePageRoutingModule { }