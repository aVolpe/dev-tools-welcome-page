import {Injectable} from '@angular/core';
import {IUser} from '../store/user/user.reducer';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {

    redirectUrl: string;
    user: IUser;
    jwt: any;

    constructor(private htttp: Http) {
    }

    isLogged() {
        return this.user != null;
    }

    login(user: string, pass: string): Observable<IUser> {

        return this.htttp.post('/api/login', {
            email : user,
            password : pass
        }).map(res => {
            const userWithToken = res.json();
            this.jwt = userWithToken.jwt;
            this.user = userWithToken.user;
            return this.user;
        });
    }
}
