import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddWorkerComponent } from '../../../admin-pages/worker/add-worker/add-worker.component';
import { HomeWorkerComponent } from '../../../admin-pages/worker/home-worker/home-worker.component';
import { RestoreWorkerComponent } from '../../../admin-pages/worker/restore-worker/restore-worker.component';
import { ShowAllWorkerComponent } from '../../../admin-pages/worker/show-all-worker/show-all-worker.component';

export const routes: Routes = [
  {
     path: '', component: HomeWorkerComponent, children: [
            { path: '', component: ShowAllWorkerComponent },
            { path: 'addWorker', component: AddWorkerComponent },
            { path: 'showAllWorker', component: ShowAllWorkerComponent },
            { path: 'restoreWorker', component: RestoreWorkerComponent }
        ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerModuleRoutingModule { }
