import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home-acre',
  templateUrl: './home-acre.component.html',
  styleUrls: ['./home-acre.component.css']
})
export class HomeAcreComponent implements OnInit {


  createShowHide: boolean = true;
  showRestoreLink = true;
  showShowAllLink = true;
  

  constructor(private session: SessionStorageService) { }

  ngOnInit() {  
    
  }
 
}
