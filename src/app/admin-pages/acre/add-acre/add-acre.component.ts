import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { AcreService } from "../../../services/acre.service";

@Component({
  selector: 'app-add-acre',
  templateUrl: './add-acre.component.html',
  styleUrls: ['./add-acre.component.css']
})
export class AddAcreComponent implements OnInit {

  myForm: FormGroup;

  ///////////////////////////////// General ////////////////////////////////////////////////
  ipAddress: any;
  dte = new Date().toLocaleString();

  /////////////////////////////////// Data Form ///////////////////////////////////////////
  dataForm = { id: '', creator_id: `${this.session.get('email')}`, creation_date: `${this.dte}`, ip_address: `${this.ipAddress}` }

  /////////////////////////////////// Lables ///////////////////////////////////////////
  acreCreated: string;

  //////////////////////////////////// Bolean Variables ////////////////////////////////
  successfullFlag = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////

  constructor( private session: SessionStorageService, private _acreService: AcreService
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
      code: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\,\.\_\ \n\:\(\)\-\/\?'&]+$")]),
      creator_id: new FormControl(`${this.session.get('userId')}`, Validators.required),
    });
 


  }

  /////////////////////////////// Methods ////////////////////////////////////////
  addAcre() {
    this.acreCreated = '';
    if (this.myForm.valid) {

      this._acreService.addAcre(this.myForm.value).subscribe(response => {
        if (response.message === 'the acre code is created') {
          this.successfullFlag = true;
          this.acreCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Acre created successfully </span>`;
          $('.responseMessage').html(this.acreCreated); // Mohammed hesham
        }
        else {
          this.successfullFlag = false;
          this.acreCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Acre code already exist, try again</span>`
          $('.responseMessage').html(this.acreCreated); // Mohammed hesham
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.acreCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
          $('.responseMessage').html(this.acreCreated); // Mohammed hesham
    }


  }
  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/acre/addAcre']));
    }, 1000);
 }

}
