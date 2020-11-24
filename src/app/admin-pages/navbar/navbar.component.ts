import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"; // JQuery

var flagMenu:boolean

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Menu & Report
  mainMenuFlag = true;
  reportMenuFlag = false;

  constructor() { 
    flagMenu = false;
  }

  ngOnInit() {

    $(document).ready(function(){

      // Sidebar
      $('#nav-icon3').click(function(e){
        $(this).toggleClass('open');
        var container = $("#nav-icon3");
        if(flagMenu && container.has(e.target).length === 0)
        {
          flagMenu = false;
          $(".page-navbar").css({ 'left': ' -100%' });
          $(".page-navbar").fadeOut()
        }
        else {
          flagMenu = true;
          $(".page-navbar").css({ 'left': ' 0%' });
          $(".page-navbar").fadeIn()
        }
      });

      $(document).mouseup(function (e) {
        var container = $(".page-navbar");
    
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          // console.log(container.has(e.target).length);
          
          if(flagMenu)
        {
          $('#nav-icon3').toggleClass();
        
          $(".page-navbar").css({ 'left': ' -100%' });
          $(".page-navbar").fadeOut()
          flagMenu = false;
        }
      }
      });
      
    });
  }

  menuOption(menuOption)
  {
    if(menuOption === 'main')
    {
      this.mainMenuFlag = true;
      this.reportMenuFlag = false;
      
      $('.backgroundMenu1').css({ 'background-color': '#333' })
      $('.backgroundMenu2').css({ 'background-color': '#252525' })
      $('.colorMenu1').css({ 'color': '#d34830' })
      $('.colorMenu2').css({ 'color': '#afafaf' })

    }
    else if(menuOption === 'report')
    {
      this.mainMenuFlag = false;
      this.reportMenuFlag = true;

      $('.backgroundMenu1').css({ 'background-color': '#252525' })
      $('.backgroundMenu2').css({ 'background-color': '#333' })
      $('.colorMenu1').css({ 'color': '#afafaf' })
      $('.colorMenu2').css({ 'color': '#d34830' })
    }
  }

  showHideItem(item,title)
  {    
    $(".titleLabel > *").removeClass("clicked-color" );
    $(`${title}`).addClass( "clicked-color" );
    $(".content-menu > *").removeClass("show-hide-item" );
    $(`${item}`).addClass( "show-hide-item" );
  }

}
