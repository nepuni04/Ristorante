import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Leader } from '../../shared/leader';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http, private processHttpmsg: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => this.processHttpmsg.extractData(res))
      .catch(err => this.processHttpmsg.handleError(err));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => this.processHttpmsg.extractData(res)[0])
      .catch(err => this.processHttpmsg.handleError(err));
  } 

}
