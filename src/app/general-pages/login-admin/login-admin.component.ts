import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import * as $ from "jquery";
import { SessionStorageService } from 'angular-web-storage';
import {LoginService} from '../../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  isLogin = true;
  mylogin: FormGroup;
  checkEmail = false;
  username = ""
  userName = ''

  constructor(private session: SessionStorageService,
    private _loginService: LoginService,
    private route: Router) {
   }

  ngOnInit() {

    this.mylogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    $(".login").css({ width: window.innerWidth });

  }

  onSubmit(){
    if (this.mylogin.valid) {      
      this._loginService.userLogin(this.mylogin.value).subscribe( response =>{
        if(response.message === 'logged successfully')
        {
          console.log("asdas");
          
        this.route.navigate(['/Dashboard']);

        }
          else
          {
            this.isLogin = false;
          }
      })
    }

   
    

    
  }

  showPassword() {
    this.session.set('email', this.mylogin.controls.email.value);
    this.checkEmail = true;
  }
  

}
