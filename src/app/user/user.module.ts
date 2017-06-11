import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { routing } from './user.router';

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedModule
    ],
    declarations: [UserListComponent],
    bootstrap: [
        UserListComponent
    ]
})
export class UserModule { }
