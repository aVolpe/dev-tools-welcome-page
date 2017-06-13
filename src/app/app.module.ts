import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { effects, store, instrumentation } from './store';
import { SharedModule } from './shared/shared.module';
import { WeatherService } from './weather/weather.service';
import {LoginModule} from './login/login.module';

@NgModule({
    declarations: [
        AppComponent
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
        WeatherService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
