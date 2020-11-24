import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class PlantWorkerService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  addPlantWorker(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/plantWorker/create`;    
    return this._http.post(url,obj) ;
  }
}
