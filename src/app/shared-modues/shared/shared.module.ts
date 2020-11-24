import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Forms //
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// HTTP Service //
import { HttpClientModule } from "@angular/common/http";

//Web Storage For Session
import { AngularWebStorageModule } from 'angular-web-storage';

/////////////////Angulart Material//////////////////
import {
  MatExpansionModule, MatNativeDateModule,
  MatRadioModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatListModule, MatChipsModule, MatCardModule,
  MatSelectModule, MatTabsModule, MatMenuModule, MatTableModule,
  MatCheckboxModule, MatPaginatorModule, MatStepperModule, MatTooltipModule,
} from "@angular/material";

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [
    CommonModule,

    // Forms //
    ReactiveFormsModule,
    FormsModule,

    //Web Storage For Session
    AngularWebStorageModule,

    // HTTP Service //
    HttpClientModule,

    // Angular Material //
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule, 
    MatPaginatorModule, 
    MatStepperModule, 
    MatTooltipModule,

    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ]
})
export class SharedModule { }
