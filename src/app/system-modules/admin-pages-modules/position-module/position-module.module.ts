import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionModuleRoutingModule } from './position-module-routing.module';

import { AddPositionComponent } from '../../../admin-pages/position/add-position/add-position.component';
import { HomePositionComponent } from '../../../admin-pages/position/home-position/home-position.component';
import { RestorePositionComponent } from '../../../admin-pages/position/restore-position/restore-position.component';
import { ShowAllPositionComponent } from '../../../admin-pages/position/show-all-position/show-all-position.component';

import { SharedModule } from '../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AddPositionComponent,
    HomePositionComponent,
    RestorePositionComponent,
    ShowAllPositionComponent
  ],
  imports: [
    SharedModule,
    PositionModuleRoutingModule
  ]
})
export class PositionModuleModule { }
