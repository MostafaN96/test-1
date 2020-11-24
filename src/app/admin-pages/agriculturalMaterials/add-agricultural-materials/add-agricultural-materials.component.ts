import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { AgriculturalMaterialsService } from "../../../services/agricultural-materials.service";
@Component({
  selector: 'app-add-agricultural-materials',
  templateUrl: './add-agricultural-materials.component.html',
  styleUrls: ['./add-agricultural-materials.component.css']
})
export class AddAgriculturalMaterialsComponent implements OnInit {

  myForm: FormGroup;

  ///////////////////////////////// General ////////////////////////////////////////////////
  ipAddress: any;
  dte = new Date().toLocaleString();

  /////////////////////////////////// Data Form ///////////////////////////////////////////
  dataForm = { id: '', creator_id: `${this.session.get('email')}`, creation_date: `${this.dte}`, ip_address: `${this.ipAddress}` }

  /////////////////////////////////// Lables ///////////////////////////////////////////
  agriculturalMaterialsCreated: string;

  //////////////////////////////////// Bolean Variables ////////////////////////////////
  successfullFlag = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////

  constructor( private session: SessionStorageService, private _agriculturalMaterialsService: AgriculturalMaterialsService
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

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\,\.\_\ \n\:\(\)\-\/\?'&]+$")]),
      creator_id: new FormControl(`${this.session.get('userId')}`, Validators.required),
    });



  }

  /////////////////////////////// Methods ////////////////////////////////////////
  addAgriculturalMaterials() {
    this.agriculturalMaterialsCreated = '';

    console.log('add methods');

    if (this.myForm.valid) {

      this._agriculturalMaterialsService.addAgriculturalMaterials(this.myForm.value).subscribe(response => {
        console.log('add response');
        console.log(response.message);

        if (response.message === 'the agricultural materials name is created') {
          this.successfullFlag = true;
          this.agriculturalMaterialsCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Agricultural Materials created successfully </span>`;
          $('.responseMessage').html(this.agriculturalMaterialsCreated); // Mohammed hesham
        }
        else {
          this.successfullFlag = false;
          this.agriculturalMaterialsCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Agricultural Materials Name already exist, try again</span>`
          $('.responseMessage').html(this.agriculturalMaterialsCreated); // Mohammed hesham
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.agriculturalMaterialsCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
          $('.responseMessage').html(this.agriculturalMaterialsCreated); // Mohammed hesham
    }


  }

   // Mohammed hesham
   reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/agriculturalMaterials/addAgriculturalMaterials']));
    }, 1000);
 }

}
