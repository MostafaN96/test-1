import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PositionService } from "../../../services/position.service";

@Component({
  selector: 'app-restore-position',
  templateUrl: './restore-position.component.html',
  styleUrls: ['./restore-position.component.css']
})
export class RestorePositionComponent implements OnInit {


//////////////////////////////////// Tabel Angular Material /////////////////////////////////
@ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
displayedColumns: string[] = ['select', 'title'];
selection = new SelectionModel(true, []);
filter = '';
dataSourceSearchTabel: any;


/////////////////////////////////// Lables ///////////////////////////////////////////
positionRestored: string;

//////////////////////////////////// Bolean Variables ////////////////////////////////
successfullFlag = false;

///////////////////////////////// General ////////////////////////////////////////////////
ipAddress: any;
dte = new Date().toLocaleString();

/////////////////////////////////// Arrays ///////////////////////////////////////////
selectedArrayValues = [];
private result = [];

constructor(private formBuilder: FormBuilder,
   private _positionService: PositionService , private session: SessionStorageService
   , private router: Router) {
    // Mohammed hesham
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }


ngOnInit() {

  this._positionService.getSelectDeleted().subscribe(response => {
    this.result = response;
    this.dataSourceSearchTabel = new MatTableDataSource(this.result);
    this.dataSourceSearchTabel.paginator = this.paginator;
  });
}

/////////////////////////////////////////// Funcions ///////////////////////////////////////////

//////////////////////////////////////Search Tabel///////////////////////////////
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSourceSearchTabel.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSourceSearchTabel.data.forEach(row => this.selection.select(row));
}

applyFilter(filterValue: string) {
  this.dataSourceSearchTabel.filter = filterValue.trim().toLowerCase();
}

selectUnsSelectArray(objectData) {
  if (this.selectedArrayValues.includes(objectData)) {
    let index = this.selectedArrayValues.indexOf(objectData);
    this.selectedArrayValues[index] = delete this.selectedArrayValues[index];
  }
  else {
    this.selectedArrayValues.push(objectData);
  }
}

selectAllSrarchTabel(i) {
  this.selectedArrayValues = i
}


//////////////////////////// Methods ////////////////////////////

restorePosition() {
  this.positionRestored = '';

  for (let i = 0; i < this.selectedArrayValues.length; i++) {

    this._positionService.restorePosition( this.selectedArrayValues[i]).subscribe(response => {
      let result = response
      if (result.message === 'the position is restored') {
        this.successfullFlag = true;

        this.positionRestored = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Position restored ${this.selectedArrayValues.length} successfully  </span>`;
        $('.responseMessage').html(this.positionRestored); // Mohammed hesham

      }

    });

  }
  if (this.selectedArrayValues.length < 1) {
    this.successfullFlag = false;
    this.positionRestored = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Please select what you want to restore</span>`;
        $('.responseMessage').html(this.positionRestored); // Mohammed hesham
  }

}


  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/position/restorePosition']));
    }, 1000);
 }

}
