import { NgModule } from '@angular/core';

import { AcreReportRoutingModule } from './acre-report-routing.module';

// Component
import { AcreReportComponent } from '../../../../admin-pages/reports/acre-report/acre-report.component';

// Shared Module
import { SharedModule } from '../../../../shared-modues/shared/shared.module';

@NgModule({
  declarations: [
    AcreReportComponent
  ],
  imports: [
    AcreReportRoutingModule,
    SharedModule
  ]
})
export class AcreReportModule { }
