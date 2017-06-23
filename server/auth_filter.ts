import { NextFunction, Request, Response, Router } from "express";
import {verify} from 'jsonwebtoken';
import {secret} from './config';

type AuthorizedRequest = Request & { headers: { authorization: string } };

function buildSecureRouter(router = Router()):Router {

    router.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
        const token = request.headers.authorization;

        verify(token, secret, (tokenError) => {
            if (tokenError) {
                return response.status(403).json({
                    message: "Invalid token, please Log in first",
                });
            }

            next();
        });
    });
    return router;

}

export { buildSecureRouter };
