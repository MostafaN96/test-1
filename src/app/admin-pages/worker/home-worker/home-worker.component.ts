import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home-worker',
  templateUrl: './home-worker.component.html',
  styleUrls: ['./home-worker.component.css']
})
export class HomeWorkerComponent implements OnInit {

  createShowHide: boolean = true;
  showRestoreLink = true;
  showShowAllLink = true;
  

  constructor(private session: SessionStorageService) { }

  ngOnInit() {  
    
  }

}
