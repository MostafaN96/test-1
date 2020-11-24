import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home-position',
  templateUrl: './home-position.component.html',
  styleUrls: ['./home-position.component.css']
})
export class HomePositionComponent implements OnInit {

  createShowHide: boolean = true;
  showRestoreLink = true;
  showShowAllLink = true;
  

  constructor(private session: SessionStorageService) { }

  ngOnInit() {  
    
  }

}
