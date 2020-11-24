import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  getPlant():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/plant/selectAll`
    return this._http.get(url);
  }

  getPlantEnd():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/plant/selectAllEnd`
    return this._http.get(url);
  }

  addPlant(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/plant/create`;    
    return this._http.post(url,obj) ;
  }

  
}
