import {RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './login.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: LoginComponent
    }
]);
