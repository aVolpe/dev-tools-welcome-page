import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';

const routes: Route[] = [
  {
    path: '',
    component: UserListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
