

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';

@Injectable()
export class HttpHelper {
    constructor(
        private http: Http,
        private service: AuthService,
        private router: Router,
        private toastyService: ToastyService) { }

    _buildOptions(queryParams: any): RequestOptions {

        let params: URLSearchParams = new URLSearchParams();

        if (queryParams) {

            if (queryParams.lastResult) {
                queryParams.limit = queryParams.lastResult;
                delete queryParams.lastResult;
            }

            if (queryParams.firstResult !== undefined && !queryParams.limit) {
                queryParams.limit = 10;
            }

            for (var propertyName in queryParams) {
                params.set(propertyName, queryParams[propertyName]);
            }
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log(this.service);
        if (this.service.isLogged()) {
            headers.append('Authorization', this.service.jwt);
            // let test: any = headers;
            // test._headers.set('authorization', [ this.service.jwt ]);
        }

        return new RequestOptions({
            headers: headers,
            search: params
        });
    }

    _handle403(ob: Observable<Response>): Observable<Response>{

        ob.subscribe(null, error => {
            if (!error.ok) {
                if (error.status === 403) {
                    this.router.navigate(['/login']);
                    this.service.logout();
                    this.toastyService.error({
                        title: 'Authorization',
                        msg: 'You are not authorized to view this page, please log in with the correct credentials'
                    })
                }
            }
        }, null)

        return ob;
    }

    post(url: string, body: any, queryParams: any = null): Observable<Response> {

        return this.http.post(url, body, this._buildOptions(queryParams));
    }

    get(url: string, queryParams: any = {}): Observable<Response> {

        return this._handle403(this.http.get(url, this._buildOptions(queryParams)));
    }

    put(url: string, body: any, queryParams: any): Observable<Response> {

        return this.http.put(url, body, this._buildOptions(queryParams));
    }
}
