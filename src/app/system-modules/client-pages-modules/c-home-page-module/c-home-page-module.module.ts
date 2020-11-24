import { NgModule } from '@angular/core';

// Routing Of Component
import { CHomePageRoutingModule } from './c-home-page-routing.module';

// Component
import { CHomePageComponent } from '../../../client-pages/c-home-page/c-home-page.component';

@NgModule({
  declarations: [
    CHomePageComponent,
    
  ],
  imports: [
    CHomePageRoutingModule
  ],
})
export class CHomePageModuleModule { }
