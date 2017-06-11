import {Action, ActionReducer} from '@ngrx/store';
import {USERS_GET_SUCCESS, USERS_GET} from './user.actions';

export interface IUser {
    name: string;
    username: string;
    email: string;
}

export const userReducer: ActionReducer<IUser> = (state: IUser, action: Action): IUser => {

    switch (action.type) {

        case USERS_GET_SUCCESS:
            console.log(action);
            return action.payload;

        default:
            return state;
    }
};
