import { NextFunction, Request, Response, Router } from "express";
import {verify} from 'jsonwebtoken';
import {secret} from './config';
import {User} from './model/User';

type AuthorizedRequest = Request & { headers: { authorization: string }, user : User };

function buildSecureRouter(router = Router()):Router {

    router.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
        const token = request.headers.authorization;

        verify(token, secret, (tokenError, decoded: User) => {
            if (tokenError) {
                return response.status(403).json({
                    message: "Invalid token, please Log in first",
                });
            }

            request.user = decoded;
            next();
        });
    });
    return router;

}

export { buildSecureRouter, AuthorizedRequest };
