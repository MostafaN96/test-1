import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// My Component
import { AcreReportComponent } from '../../../../admin-pages/reports/acre-report/acre-report.component';

export const routes: Routes = [
    {
        path: '', component: AcreReportComponent
    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcreReportRoutingModule { }
