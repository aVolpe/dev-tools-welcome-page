import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/index';
import {Observable} from 'rxjs';
import {IUser} from '../../store/user/user.reducer';
import {USERS_GET} from '../../store/user/user.actions';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    finalUsers: IUser[];

    constructor(public store: Store<IAppState>) {}

    ngOnInit() {

        this.store.dispatch({
            type: USERS_GET
        });

        this.store.select("users").subscribe((data : IUser[]) => {
            this.finalUsers = data;
        });
    }

}
