import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {routing} from './login.router';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {HttpModule} from '@angular/http';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule {
}
