import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import { SessionStorageService } from 'angular-web-storage';
import * as $ from 'jquery';
import { WorkerService } from "../../../services/worker.service";
import { PositionService } from "../../../services/position.service";

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  myForm: FormGroup;

  ///////////////////////////////// General ////////////////////////////////////////////////
  ipAddress: any;
  dte = new Date().toLocaleString();

  /////////////////////////////////// Data Form ///////////////////////////////////////////
  dataForm = { id: '', creator_id: `${this.session.get('email')}`, creation_date: `${this.dte}`, ip_address: `${this.ipAddress}` }

  /////////////////////////////////// Lables ///////////////////////////////////////////
  workerCreated: string;
  private resultPosition: any;
  //////////////////////////////////// Bolean Variables ////////////////////////////////
  successfullFlag = false;

  /////////////////////////////////////////////////////////////////////////////////////////////////

  constructor( private _positionService: PositionService,
     private session: SessionStorageService, private _workerService: WorkerService
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

    this._positionService.getSelectAll().subscribe(response => {
      this.resultPosition = response;
  
    });

    this.myForm = new FormGroup({
      position_id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\ \]+$")]),
      salary: new FormControl('', [Validators.required, Validators.pattern("^[0-9\.\]+$")]),
      creator_id: new FormControl(`${this.session.get('userId')}`, Validators.required),
    });



  }

  /////////////////////////////// Methods ////////////////////////////////////////
  addWorker() {
    this.workerCreated = '';

    console.log('add methods');

    if (this.myForm.valid) {

      this._workerService.addWorker(this.myForm.value).subscribe(response => {
        console.log('add response');
        console.log(response.message);

        if (response.message === 'the worker is created') {
          this.successfullFlag = true;
          this.workerCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Worker created successfully </span>`;
          $('.responseMessage').html(this.workerCreated); // Mohammed hesham
        }
        else {
          this.successfullFlag = false;
          this.workerCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The Worker already exist, try again</span>`
          $('.responseMessage').html(this.workerCreated); // Mohammed hesham
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.workerCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
          $('.responseMessage').html(this.workerCreated); // Mohammed hesham
    }


  }

  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
   this.router.navigateByUrl('/Dashboard', {skipLocationChange: true})
     .then(() => this.router.navigate(['Dashboard/worker/addWorker']));
    }, 1000);
 }



}
