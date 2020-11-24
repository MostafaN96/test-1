import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class AcreService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }
  getSelectDeleted():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/acre/selectDeleted`
    return this._http.get(url) ;
  }

  getSelectAll():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/acre/selectAll`
    return this._http.get(url) ;
  }


  addAcre(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}http://localhost:3000/acre/create`;
    return this._http.post(url,obj) ;
  }


  updateAcre(obj):Observable <any>{    
    let url = `${this._linkUrlService.getLink()}/acre/update/${obj.id}`;
    return this._http.post(url,obj) ;
  }


  deleteAcre(obj): Observable<any> {
        let url = `${this._linkUrlService.getLink()}/acre/delete/${obj.id}`;
        return this._http.post(url, obj);
  }


  restoreAcre(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/acre/restore/${obj.id}`;
        return this._http.post(url, obj);
  }

}
