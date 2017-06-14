import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {IAppState} from '../store/index';
import {USER_GET} from '../store/profile/profile.actions';
import {ToastOptions, ToastyConfig, ToastyService, ToastData} from 'ng2-toasty';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    public observable$: Observable<{}>;
    public opened: boolean = false;


    constructor(private http: Http, private store: Store<IAppState>) { }

    ngOnInit() {

        this.opened = true;

        this.observable$ = this.http
            .get('/api/public/simple')
            .map((response: Response) => response.json());

        this.store.dispatch({
            type: USER_GET
        });
    }

    public toggleSidebar() {
        this.opened = !this.opened;
    }

}
