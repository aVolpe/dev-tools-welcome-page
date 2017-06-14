import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from './login/auth-guard.service';
import {LayoutComponent} from './layout/layout.component';

const routes: Route[] = [
    { loadChildren: 'app/login/login.module#LoginModule', path: 'login' },
    {
        path: '',
        component: LayoutComponent,
        canActivateChild: [ AuthGuard ],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
            { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard'},
            { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile'},
            { loadChildren: 'app/weather/weather.module#WeatherModule', path: 'weather'},
            { loadChildren: 'app/user/user.module#UserModule', path: 'user'}
        ]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
