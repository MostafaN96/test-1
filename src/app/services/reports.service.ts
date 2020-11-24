import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  getAcreRepoort():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/reports/plan`
    return this._http.get(url) ;
  }
}
