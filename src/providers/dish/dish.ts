import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Dish } from '../../shared/dish';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the DishProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http, private processHttpmsg: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => this.processHttpmsg.extractData(res)[0])
      .catch(err => this.processHttpmsg.handleError(err));
  } 
}
