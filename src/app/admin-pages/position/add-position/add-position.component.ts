import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { PositionService } from "../../../services/position.service";

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {


  myForm: FormGroup;

  ///////////////////////////////// General ////////////////////////////////////////////////
  ipAddress: any;
  dte = new Date().toLocaleString();

  /////////////////////////////////// Data Form ///////////////////////////////////////////
  dataForm = { id: '', creator_id: `${this.session.get('email')}`, creation_date: `${this.dte}`, ip_address: `${this.ipAddress}` }

  /////////////////////////////////// Lables ///////////////////////////////////////////
  positionCreated: string;

  //////////////////////////////////// Bolean Variables ////////////////////////////////
  successfullFlag = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////

  constructor( private session: SessionStorageService, private _positionService: PositionService
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
      title: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\ \]+$")]),
      creator_id: new FormControl(`${this.session.get('userId')}`, Validators.required),
    });



  }

  /////////////////////////////// Methods ////////////////////////////////////////
  addPosition() {
    this.positionCreated = '';

    console.log('add methods');

    if (this.myForm.valid) {

      this._positionService.addPosition(this.myForm.value).subscribe(response => {

        if (response.message === 'the position title is created') {
          this.successfullFlag = true;
          this.positionCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Position created successfully </span>`;
          $('.responseMessage').html(this.positionCreated); // Mohammed hesham
        }
        else {
          this.successfullFlag = false;
          this.positionCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Position Title already exist, try again</span>`
          $('.responseMessage').html(this.positionCreated); // Mohammed hesham
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.positionCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
          $('.responseMessage').html(this.positionCreated); // Mohammed hesham
    }


  }

  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/position/addPosition']));
    }, 1000);
 }


}
