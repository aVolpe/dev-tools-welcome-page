import {Effect, Actions} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {USERS_GET, USERS_GET_FAIL, USERS_GET_SUCCESS} from './user.actions';

@Injectable()
export class UserEffects {

    @Effect()
    allUserGet$ = this.actions$
        .ofType(USERS_GET)
        .switchMap((action: Action) => {

            return this.http.get('/api/user', action.payload)
                .map((response: Response) => response.json())
                .catch(() => Observable.of(({type: USERS_GET_FAIL})))
                .map((response) => ({type: USERS_GET_SUCCESS, payload: response}));

        });

    constructor(private actions$: Actions, private http: Http) {
    }
}
