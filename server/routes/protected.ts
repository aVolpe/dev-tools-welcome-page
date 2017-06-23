import {Request, Response, Router} from 'express';
import {buildSecureRouter} from '../auth_filter';

const protectedRouter: Router = buildSecureRouter();

protectedRouter.get("/", (request: Request, response: Response) => {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call",
    });
});

export { protectedRouter };
