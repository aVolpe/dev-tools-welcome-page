import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from './login/auth-guard.service';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'weather'},
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard', canActivate: [ AuthGuard ] },
  { loadChildren: 'app/profile/profile.module#ProfileModule', path: 'profile', canActivate: [ AuthGuard ] },
  { loadChildren: 'app/weather/weather.module#WeatherModule', path: 'weather', canActivate: [ AuthGuard ] },
  { loadChildren: 'app/user/user.module#UserModule', path: 'user', canActivate: [ AuthGuard ] },
  { loadChildren: 'app/login/login.module#LoginModule', path: 'login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
