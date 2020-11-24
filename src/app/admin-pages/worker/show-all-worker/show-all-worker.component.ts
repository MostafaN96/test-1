import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { WorkerService } from "../../../services/worker.service";

@Component({
  selector: 'app-show-all-worker',
  templateUrl: './show-all-worker.component.html',
  styleUrls: ['./show-all-worker.component.css']
})
export class ShowAllWorkerComponent implements OnInit {


//////////////////////////////////// Tabel Angular Material /////////////////////////////////
@ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
displayedColumns: string[] = ['select', 'name','salary', 'title',  'update'];
selection = new SelectionModel(true, []);
filter = '';
dataSourceSearchTabel: any;

///////////////////////////////// Form Group & Form Control ////////////////////////////////
myform: FormGroup;

/////////////////////////////////// Labels ///////////////////////////////////////////
responseMessage: string;
workerDeleted: string;

///////////////////////////////// General ////////////////////////////////////////////////
ipAddress: any;
dte = new Date().toLocaleString();

//////////////////////////////////// Bolean Variables ////////////////////////////////
successfullFlag = false;

/////////////////////////////////// Data Form ///////////////////////////////////////////
dataForm = { name: "", salary: "" , id: ``, creation_date: `${this.dte}` }

/////////////////////////////////// Date //////////////////////////////////////////
nowDate = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() +
 " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

/////////////////////////////////// Arrays ///////////////////////////////////////////
selectedArrayValues = [];
private result: any;

//////////////////////////////////////////////////////////////////////////////////////////////

constructor(
  private _workerService: WorkerService, private session: SessionStorageService
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

  this._workerService.getWorkerPosition().subscribe(response => {
    this.result = response;

    this.dataSourceSearchTabel = new MatTableDataSource(this.result);
    this.dataSourceSearchTabel.paginator = this.paginator;
  });

  this.myform = new FormGroup({
    id: new FormControl('', Validators.required),
    updateName: new FormControl(``, [Validators.required, Validators.pattern("^[a-zA-Z\ \]+$")]),
    updateSalary: new FormControl(``, [Validators.required, Validators.pattern("^[0-9]+$")]),
    creator_id: new FormControl('mohamed', Validators.required),
  });

}

/////////////////////////////////// Functions ///////////////////////////////////////////

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

getindexSearchTabel(i) {
  this.dataForm.id = i.worker_id;
  this.dataForm.name = i.name;
  this.dataForm.salary = i.salary;
  this.myform.controls.id.setValue(i.worker_id);
}

///////////////////////////// Methods ////////////////////////////////
// update
updateWorker() {
  this.responseMessage = " ";

  if(this.myform.valid)
  {
    this._workerService.updateWorker(this.myform.value).subscribe(response => {
      let result = response
      if (result.message === 'Data update') {
        this.successfullFlag = true;
        this.responseMessage =`<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">worker updated sucessfully </span>`;
          $('.responseMessageUpdate').html(this.responseMessage); // Mohammed hesham
      }
      else {
        this.successfullFlag = false;
          this.responseMessage =`<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Worker Name already exist, try again </span>`;
          $('.responseMessageUpdate').html(this.responseMessage); // Mohammed hesham
      }

    });

  }
  else {
    this.successfullFlag = false;
    this.responseMessage = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Please check invalid input!!!</span>`
        $('.responseMessageUpdate').html(this.responseMessage); // Mohammed hesham
  }


}

// delete
deleteWorker() {
  this.workerDeleted = '';

  for (let i = 0; i < this.selectedArrayValues.length; i++) {

    this._workerService.deleteWorker( this.selectedArrayValues[i]).subscribe(response => {

      if (response.message === "the worker is deleted") {
        this.successfullFlag = true;
          this.workerDeleted = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Worker deleted successfully</span>`;
        $('.responseMessageDelete').html(this.workerDeleted); // Mohammed hesham

      }

    });

  }

  if (this.selectedArrayValues.length < 1) {
    this.successfullFlag = false;
      this.workerDeleted = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Please select what you want to delete</span>`;
        $('.responseMessageDelete').html(this.workerDeleted); // Mohammed hesham
  }

}


  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $( ".uk-modal-container ,.uk-flex-top " ).remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/worker/showAllWorker']));
    }, 1000);
 }


}
