import { NgModule } from '@angular/core';

// Routing Of Component
import { HomePageRoutingModule } from './home-page-routing.module';

// Component
import { HomePageComponent } from '../../../admin-pages/home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    
  ],
  imports: [
    HomePageRoutingModule
  ],
})
export class HomePageModuleModule { }
