import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerModuleRoutingModule } from './worker-module-routing.module';

import { AddWorkerComponent } from '../../../admin-pages/worker/add-worker/add-worker.component';
import { HomeWorkerComponent } from '../../../admin-pages/worker/home-worker/home-worker.component';
import { RestoreWorkerComponent } from '../../../admin-pages/worker/restore-worker/restore-worker.component';
import { ShowAllWorkerComponent } from '../../../admin-pages/worker/show-all-worker/show-all-worker.component';

import { SharedModule } from '../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AddWorkerComponent,
    HomeWorkerComponent,
    RestoreWorkerComponent,
    ShowAllWorkerComponent
  ],
  imports: [
    SharedModule,
    WorkerModuleRoutingModule
  ]
})
export class WorkerModuleModule { }
