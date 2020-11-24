import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AgriculturalMaterialsService } from "../../../services/agricultural-materials.service";

@Component({
  selector: 'app-show-all-agricultural-materials',
  templateUrl: './show-all-agricultural-materials.component.html',
  styleUrls: ['./show-all-agricultural-materials.component.css']
})
export class ShowAllAgriculturalMaterialsComponent implements OnInit {

//////////////////////////////////// Tabel Angular Material /////////////////////////////////
@ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
displayedColumns: string[] = ['select', 'name', 'update'];
selection = new SelectionModel(true, []);
filter = '';
dataSourceSearchTabel: any;

///////////////////////////////// Form Group & Form Control ////////////////////////////////
myform: FormGroup;

/////////////////////////////////// Labels ///////////////////////////////////////////
responseMessage: string;
agriculturalMaterialsDeleted: string;

///////////////////////////////// General ////////////////////////////////////////////////
ipAddress: any;
dte = new Date().toLocaleString();

//////////////////////////////////// Bolean Variables ////////////////////////////////
successfullFlag = false;

/////////////////////////////////// Data Form ///////////////////////////////////////////
dataForm = { name: "", id: ``, creation_date: `${this.dte}` }

/////////////////////////////////// Date //////////////////////////////////////////
nowDate = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() +
 " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();

/////////////////////////////////// Arrays ///////////////////////////////////////////
selectedArrayValues = [];
private result: any;

//////////////////////////////////////////////////////////////////////////////////////////////

constructor(
  private _agriculturalMaterialsService: AgriculturalMaterialsService, private session: SessionStorageService
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

  this._agriculturalMaterialsService.getSelectAll().subscribe(response => {
    this.result = response;

    this.dataSourceSearchTabel = new MatTableDataSource(this.result);
    this.dataSourceSearchTabel.paginator = this.paginator;
  });

  this.myform = new FormGroup({
    id: new FormControl('', Validators.required),
    updateName: new FormControl(``, [Validators.required, Validators.pattern("^[a-zA-Z0-9\,\.\_\ \n\:\(\)\-\/\?'&]+$")]),
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
  this.dataForm.id = i.id;
  this.dataForm.name = i.name;
  this.myform.controls.id.setValue(i.id);
}

///////////////////////////// Methods ////////////////////////////////
// update
updateAgriculturalMaterials() {
  this.responseMessage = " ";

  if(this.myform.valid)
  {
    this._agriculturalMaterialsService.updateAgriculturalMaterials(this.myform.value).subscribe(response => {
      let result = response
      if (result.message === 'Data update') {
        this.successfullFlag = true;
        this.responseMessage =`<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Agricultural Materials updated sucessfully </span>`;
          $('.responseMessageUpdate').html(this.responseMessage); // Mohammed hesham

        $("#modal-alert-update-agriculturalMaterials").attr({ "uk-modal": "center:true; esc-close: false; bg-close:false;" });

      }
      else {
        this.successfullFlag = false;
          this.responseMessage =`<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Agricultural Materials Name already exist, try again </span>`;
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
deleteAgriculturalMaterials() {
  this.agriculturalMaterialsDeleted = '';

  for (let i = 0; i < this.selectedArrayValues.length; i++) {

    this._agriculturalMaterialsService.deleteAgriculturalMaterials( this.selectedArrayValues[i]).subscribe(response => {

      if (response.message === "the agricultural materials is deleted") {
        this.successfullFlag = true;
          this.agriculturalMaterialsDeleted = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Agricultural Materials deleted successfully</span>`;
        $('.responseMessageDelete').html(this.agriculturalMaterialsDeleted); // Mohammed hesham

      }

    });

  }

  if (this.selectedArrayValues.length < 1) {
    this.successfullFlag = false;
      this.agriculturalMaterialsDeleted = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
        <span class="d-block text-center" style="font-size: 18px;">Please select what you want to delete</span>`;
        $('.responseMessageDelete').html(this.agriculturalMaterialsDeleted); // Mohammed hesham
  }

}


  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $( ".uk-modal-container ,.uk-flex-top " ).remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/agriculturalMaterials/showAllAgriculturalMaterials']));
    }, 1000);
 }


}
