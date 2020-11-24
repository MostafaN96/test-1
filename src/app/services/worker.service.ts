import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  getWorkerPosition():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/worker/selectWorkerPosition`
    return this._http.get(url) 
  }

  getSelectDeleted():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/worker/selectDeleted`
    return this._http.get(url) ;
  }


  addWorker(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/worker/create`;
    return this._http.post(url,obj) ;
  }


  updateWorker(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/worker/update/${obj.worker_id}`;
    return this._http.post(url,obj) ;
  }


  deleteWorker(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/worker/delete/${obj.worker_id}`;
    return this._http.post(url,obj) ;
  }


  restoreWorker(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/worker/restore/${obj.worker_id}`;
    return this._http.post(url,obj) ;
  }
}
