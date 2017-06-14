import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from "@angular/http";
import {IAppState} from '../store/index';
import {USER_GET} from '../store/profile/profile.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  observable$: Observable<{}>;

  constructor(private http: Http, private store: Store<IAppState>) {}

  ngOnInit() {
    this.observable$ = this.http
        .get('/api/public/simple')
        .map((response: Response) => response.json());

    this.store.dispatch({
      type: USER_GET
    });
  }

}
