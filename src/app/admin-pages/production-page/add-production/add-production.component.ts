import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"; //Forms
import { PlantService } from "../../../services/plant.service"; // Service
import { ProductionService } from "../../../services/production.service"; // Service
import { Router, NavigationEnd } from '@angular/router'; // Mohammed hesham
import * as $ from 'jquery'; // Mohammed hesham

@Component({
  selector: 'app-add-production',
  templateUrl: './add-production.component.html',
  styleUrls: ['./add-production.component.css']
})
export class AddProductionComponent implements OnInit {

  // Form
  firstFormGroup: FormGroup;

  // Messages
  messageCreated: string;
  successfullFlag = false;

  //Variables
  resultPlant: any

  constructor(private _plantService: PlantService,
    private _productionService: ProductionService,
    private router: Router) {
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


    this.firstFormGroup = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      sellingPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      plantId: new FormControl('', [Validators.required]),
    });
    this._plantService.getPlantEnd().subscribe(response => {
      this.resultPlant = response;
      console.log();

    });
  }

  addProduction() {
    this.messageCreated = '';
    if (this.firstFormGroup.valid) {
      this._productionService.addProduction(this.firstFormGroup.value).subscribe(response => {
        if (response.message === 'the production is created') {
          this.successfullFlag = true;
          this.messageCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">production created successfully </span>`;
          $('.responseMessage').html(this.messageCreated) // Mohammed hesham

        }
        else {
          this.successfullFlag = false;
          this.messageCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The production already exist, try again</span>`
          $('.responseMessage').html(this.messageCreated) // Mohammed hesham
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.messageCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
      $('.responseMessage').html(this.messageCreated) // Mohammed hesham
    }
  }

  // Mohammed hesham
  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
      this.router.navigateByUrl('/Dashboard', { skipLocationChange: true })
        .then(() => this.router.navigate(['Dashboard/production']));
    }, 1000);
  }
}
