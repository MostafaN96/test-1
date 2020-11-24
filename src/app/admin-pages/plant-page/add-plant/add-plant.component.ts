import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"; //Forms
import { SessionStorageService } from 'angular-web-storage'; // Session
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'; // Stepper Option
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap'; // DatePicker
import { PlantService } from "../../../services/plant.service"; // Service
import { WorkerService } from "../../../services/worker.service"; // Service
import { AgriculturalMaterialsService } from "../../../services/agricultural-materials.service"; // Service
import { AcreService } from "../../../services/acre.service"; // Service
import { MatTableDataSource, MatPaginator } from '@angular/material'; // Angular Material Table
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { isNumber } from 'util';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AddPlantComponent implements OnInit {

  // Angular Material Table
  //  -Worker-
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumnsWorker: string[] = ['selectWorker', 'position', 'worker'];
  dataSourceWorker: any;
  selectedArrayValuesWorker = [];

  //  -Agricultural Materials-
  @ViewChild(MatPaginator, { static: true }) paginatorAM: MatPaginator;
  displayedColumnsAM: string[] = ['selectAM', 'name'];
  dataSourceAM: any;
  selectedArrayValuesAM = [];

  // DatePicker
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  // Form
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;

  // Messages
  messageCreated: string;
  successfullFlag = false;

  //Variables
  resultAcre: any
  // --
  resultWorker: any
  selectWorker = []
  // --
  resultAM: any
  selectAM = []
  isEmpty = false;
  messAlert = false;

  constructor(private session: SessionStorageService, private _formBuilder: FormBuilder,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private _plantService: PlantService,
    private _agriculturalMaterialsService: AgriculturalMaterialsService,
    private _workerService: WorkerService,
    private _acreService: AcreService,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9\,\.\_\ \n\:\(\)\-\/\?'&]*$")]),
      startDate: new FormControl(this.formatter.format(this.fromDate), [Validators.required, Validators.pattern("[2-9]{4}[-]([0][1-9])|([1][012])[-]([0][1-9])|([1][0-9])|([2][0-9])|([3][01])$")]),
      endDate: new FormControl(this.formatter.format(this.toDate), [Validators.required, Validators.pattern("[2-9]{4}[-]([0][1-9])|([1][012])[-]([0][1-9])|([1][0-9])|([2][0-9])|([3][01])$")]),
      acreId: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = new FormGroup({
      workerObj: new FormControl('', [Validators.required]),
    });

    this.ThirdFormGroup = new FormGroup({
      amObj: new FormControl([''], [Validators.required]),
    });

    this._acreService.getSelectAll().subscribe(response => {
      this.resultAcre = response;
    });

    this._workerService.getWorkerPosition().subscribe(response => {
      this.resultWorker = response;
      this.dataSourceWorker = new MatTableDataSource(this.resultWorker);
      this.dataSourceWorker.paginator = this.paginator;

    });

    this._agriculturalMaterialsService.getSelectAll().subscribe(response => {
      this.resultAM = response;
      this.dataSourceAM = new MatTableDataSource(this.resultAM);
      this.dataSourceAM.paginator = this.paginatorAM;
    });
  }

  amountFunc(click, amount) {
    for (let i = 0; i < this.selectAM.length; i++) {
      if (this.ThirdFormGroup.controls.amObj.value[i] == click) {
        this.ThirdFormGroup.controls.amObj.value[i].amount = amount.target.value
      }
    }
    setTimeout(() => {
      this.requiredAttr();
    }, 500);
  }



  costFunc(click, cost) {
    for (let i = 0; i < this.selectAM.length; i++) {
      if (this.ThirdFormGroup.controls.amObj.value[i] == click) {
        this.ThirdFormGroup.controls.amObj.value[i].cost = cost.target.value
      }
    }
    setTimeout(() => {
      this.requiredAttr();
    }, 500);
  }

  // Check if in Object the atrribute not have data
  requiredAttr() {
    for (var key in this.ThirdFormGroup.controls.amObj.value) {
      if (this.ThirdFormGroup.controls.amObj.value.hasOwnProperty(key))
        this.isEmpty = !Object.values(this.ThirdFormGroup.controls.amObj.value[key]).some(x => (x === null || x === ""));
    }
    if (!this.isEmpty) {
      this.messAlert = true;
    }
    setTimeout(() => {
      this.messAlert = false;
    }, 2000);
  }

  addPlant() {
    this.messageCreated = '';
    if (this.firstFormGroup.valid) {
      this._plantService.addPlant({
        plantObj: this.firstFormGroup.value,
        workerObj: this.secondFormGroup.value, agriculturalMaterialObj: this.ThirdFormGroup.value
      }).subscribe(response => {
        if (response.message === 'the plant is created') {
          this.successfullFlag = true;
          this.messageCreated = `<i class="fas fa-check-circle text-success" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">plant created successfully </span>`;
          $('.responseMessage').html(this.messageCreated)
        }
        else {
          this.successfullFlag = false;
          this.messageCreated = `<i class="fas fa-times-circle text-danger" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">The plant already exist, try again</span>`
          $('.responseMessage').html(this.messageCreated)
        }

      });

    }
    else {
      this.successfullFlag = false;
      this.messageCreated = `<i class="fas fa-info-circle text-warning" style="font-size: 60px"></i>
          <span class="d-block text-center" style="font-size: 18px;">Invalid input!!</span>`
      $('.responseMessage').html(this.messageCreated)
    }
  }

  // Angular Material Table
  // -Worker
  applyFilterWorker(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWorker.filter = filterValue.trim().toLowerCase();
  }

  getSelectedWorker(event, worker) {
    this.selectWorker = []

    if (event.checked) {
      this.selectedArrayValuesWorker.push(worker)
    }
    else {
      let index = this.selectedArrayValuesWorker.indexOf(worker)
      this.selectedArrayValuesWorker[index] = delete this.selectedArrayValuesWorker[index]
    }
    this.selectedArrayValuesWorker.forEach((element) => {
      if (element !== true)
        this.selectWorker.push(element)
    });
    // console.log(this.selectWorker);   
  }


  // -Agricultural Materials-
  applyFilterAM(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAM.filter = filterValue.trim().toLowerCase();
  }

  getSelectedAM(event, worker) {
    this.selectAM = []
    worker.cost = ""
    worker.amount = ""
    if (event.checked) {
      this.selectedArrayValuesAM.push(worker);
      // const validators = [ Validators.required, Validators.minLength(5) ];
      // this.form.addControl('optionBExtra', new FormControl('', validators));
    }
    else {
      let index = this.selectedArrayValuesAM.indexOf(worker)
      this.selectedArrayValuesAM[index] = delete this.selectedArrayValuesAM[index]
    }
    this.selectedArrayValuesAM.forEach((element) => {
      if (element !== true)
        this.selectAM.push(element)
    });
    console.log(this.selectAM);
    setTimeout(() => {
      this.requiredAttr();
    }, 500);
  }

  reload() {
    setTimeout(() => {
      $(".uk-modal-container ,.uk-flex-top ").remove();
      this.router.navigateByUrl('/Dashboard', { skipLocationChange: true })
        .then(() => this.router.navigate(['Dashboard/plant']));
    }, 1000);
  }

  // DatePicker
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.firstFormGroup.controls.endDate.setValue(this.formatter.format(date));
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.firstFormGroup.controls.startDate.setValue(this.formatter.format(date));
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}
