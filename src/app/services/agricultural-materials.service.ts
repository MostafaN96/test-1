import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {LinkUrlService} from './link-url.service'

@Injectable({
  providedIn: 'root'
})
export class AgriculturalMaterialsService {

  constructor(private _http :HttpClient, private _linkUrlService: LinkUrlService ) { }

  getSelectDeleted():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/agriculturalMaterials/selectDeleted`
    return this._http.get(url) ;
  }

  getSelectAll():Observable <any>
  {
    const url = `${this._linkUrlService.getLink()}/agriculturalMaterials/selectAll`
    return this._http.get(url) ;
  }


  addAgriculturalMaterials(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/agriculturalMaterials/create`;
    return this._http.post(url,obj) ;
  }


  updateAgriculturalMaterials(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/agriculturalMaterials/update/${obj.id}`;
    return this._http.post(url,obj) ;
  }



  deleteAgriculturalMaterials(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/agriculturalMaterials/delete/${obj.id}`;
    return this._http.post(url,obj) ;
  }


  restoreAgriculturalMaterials(obj):Observable <any>{
    let url = `${this._linkUrlService.getLink()}/agriculturalMaterials/restore/${obj.id}`;
    return this._http.post(url,obj) ;
  }
}
