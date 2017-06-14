import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.router';
import {effects, instrumentation, store} from './store';
import {SharedModule} from './shared/shared.module';
import {WeatherService} from './weather/weather.service';
import {LoginModule} from './login/login.module';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './login/auth-guard.service';
import {AuthService} from './login/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        FormsModule,
        HttpModule,
        store,
        effects,
        routing,
        instrumentation,
        LoginModule
    ],
    providers: [
        WeatherService,
        AuthGuard,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
