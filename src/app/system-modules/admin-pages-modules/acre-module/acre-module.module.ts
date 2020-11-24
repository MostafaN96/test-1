import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcreModuleRoutingModule } from './acre-module-routing.module';

import { AddAcreComponent } from '../../../admin-pages/acre/add-acre/add-acre.component';
import { HomeAcreComponent } from '../../../admin-pages/acre/home-acre/home-acre.component';
import { RestoreAcreComponent } from '../../../admin-pages/acre/restore-acre/restore-acre.component';
import { ShowAllAcreComponent } from '../../../admin-pages/acre/show-all-acre/show-all-acre.component';

import { SharedModule } from '../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AddAcreComponent,
    HomeAcreComponent,
    RestoreAcreComponent,
    ShowAllAcreComponent
  ],
  imports: [
    SharedModule,
    AcreModuleRoutingModule
  ]
})
export class AcreModuleModule { }
