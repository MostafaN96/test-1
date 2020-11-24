import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../../services/reports.service"; // Service
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham

@Component({
  selector: 'app-acre-report',
  templateUrl: './acre-report.component.html',
  styleUrls: ['./acre-report.component.css']
})
export class AcreReportComponent implements OnInit {

  //Variables
  resultPlant: any

  constructor(private _reportService: ReportsService,private router: Router) { }

  ngOnInit() {

    this._reportService.getAcreRepoort().subscribe(response => {
      this.resultPlant = response;

    });
  }

  reload() {
    setTimeout(() => {
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/report/plant']));
    }, 1000);
 }

}
