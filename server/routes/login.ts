import {pbkdf2, randomBytes} from 'crypto';
import {NextFunction, Request, Response, Router} from 'express';
import {sign} from 'jsonwebtoken';
import {digest, length, secret} from '../config';
import {User} from '../model/User';

const loginRouter: Router = Router();

// login method
loginRouter.post("/", (request: Request, response: Response, next: NextFunction) => {

    User.login(request.body.email, request.body.password)
        .then(user => {
            const token = sign(user, secret, {expiresIn: "7d"});
            response.json({ jwt: token, user: user });
        })
        .catch(error => {
            response.status(501);
            response.json(error);
        })
});

export {loginRouter};
