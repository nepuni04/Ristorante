import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Promotion } from '../../shared/promotion';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: Http, private processHttpmsg: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => this.processHttpmsg.extractData(res)[0])
      .catch(err => this.processHttpmsg.handleError(err));
  } 
}
