import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  addProduction(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/production/create`;    
    return this._http.post(url,obj) ;
  }
}
