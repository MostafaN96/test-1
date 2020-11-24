import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

   
  constructor(private _http :HttpClient , private session: SessionStorageService, private _linkUrlService: LinkUrlService ) { }


  getSelectDeleted():Observable <any>
  {

    const url = `${this._linkUrlService.getLink()}/position/selectDeleted`

    return this._http.get(url) ;
  }

  getSelectAll():Observable <any>
  {

    const url = `${this._linkUrlService.getLink()}/position/selectAll`

    return this._http.get(url) ;
  }


  addPosition(obj):Observable <any>{

    let url = `${this._linkUrlService.getLink()}/position/create`;


    console.log('token');
    
    console.log(`Bearer ${this.session.get('token')}`);
    
    return this._http.post(url,obj,
      {headers : new HttpHeaders({
        'authorization':`Bearer ${this.session.get('token')}`

      })}) ;
  }


  updatePosition(obj):Observable <any>{

    let url = `${this._linkUrlService.getLink()}/position/update/${obj.id}`;


    console.log('token');
    
    console.log(`Bearer ${this.session.get('token')}`);
    
    return this._http.post(url,obj,
      {headers : new HttpHeaders({
        'authorization':`Bearer ${this.session.get('token')}`

      })}) ;
  }



  deletePosition(obj):Observable <any>{

    let url = `${this._linkUrlService.getLink()}/position/delete/${obj.id}`;

    
    return this._http.post(url,obj,
      {headers : new HttpHeaders({
        'authorization':`Bearer ${this.session.get('token')}`

      })}) ;
  }


  restorePosition(obj):Observable <any>{

    let url = `${this._linkUrlService.getLink()}/position/restore/${obj.id}`;


  
    
    return this._http.post(url,obj,
      {headers : new HttpHeaders({
        'authorization':`Bearer ${this.session.get('token')}`

      })}) ;
  }

}
