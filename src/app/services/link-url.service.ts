import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkUrlService {

  constructor() { }

  getLink()
  {
    return 'http://localhost:3000' ;
  }
  
}
