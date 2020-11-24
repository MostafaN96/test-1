import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

// Admin Side
import { RoutingPageComponent } from './admin-pages/routing-page/routing-page.component';

// Client Side
import { CRoutingPageComponent } from './client-pages/c-routing-page/c-routing-page.component';

// ERROR PAGE
import { PageNotFoundComponent } from './general-pages/page-not-found/page-not-found.component';

// ERROR PAGE
import { LoginAdminComponent } from './general-pages/login-admin/login-admin.component';

const routes: Routes = [
  {
    path: 'Dashboard', component: RoutingPageComponent, children:
            [
              { path: '', loadChildren: () => import('./system-modules/admin-pages-modules/home-page-module/home-page-module.module').then(m => m.HomePageModuleModule) },
              { path: 'plant', loadChildren: () => import('./system-modules/admin-pages-modules/plant-page-module/plant-page-module.module').then(m => m.PlantPageModuleModule) },
              { path: 'production', loadChildren: () => import('./system-modules/admin-pages-modules/production-page-module/production-page-module.module').then(m => m.ProductionPageModuleModule) },
              { path: 'acre', loadChildren: () => import('./system-modules/admin-pages-modules/acre-module/acre-module.module').then(m => m.AcreModuleModule) },
              { path: 'position', loadChildren: () => import('./system-modules/admin-pages-modules/position-module/position-module.module').then(m => m.PositionModuleModule) },
              { path: 'agriculturalMaterials', loadChildren: () => import('./system-modules/admin-pages-modules/agricultural-materials-module/agricultural-materials-module.module').then(m => m.AgriculturalMaterialsModuleModule) },
              { path: 'worker', loadChildren: () => import('./system-modules/admin-pages-modules/worker-module/worker-module.module').then(m => m.WorkerModuleModule) },
              { path: 'report/plant', loadChildren: () => import('./system-modules/admin-pages-modules/reports/acre-report/acre-report.module').then(m => m.AcreReportModule) },


              { path: '**', component: PageNotFoundComponent }
            ]
  },
  {
    path: '', component: CRoutingPageComponent, children:
        [
          { path: '', loadChildren: () => import('./system-modules/client-pages-modules/c-home-page-module/c-home-page-module.module').then(m => m.CHomePageModuleModule) },
        ]
  },

  { path: 'loginAdmin', component: LoginAdminComponent },
  
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

  
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }