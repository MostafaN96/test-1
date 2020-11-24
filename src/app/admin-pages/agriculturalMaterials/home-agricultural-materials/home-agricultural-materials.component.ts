import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-home-agricultural-materials',
  templateUrl: './home-agricultural-materials.component.html',
  styleUrls: ['./home-agricultural-materials.component.css']
})
export class HomeAgriculturalMaterialsComponent implements OnInit {

  createShowHide: boolean = true;
  showRestoreLink = true;
  showShowAllLink = true;
  

  constructor(private session: SessionStorageService) { }

  ngOnInit() {  
    
  }

}
