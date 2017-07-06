import {Request, Response} from 'express';
import {User} from '../model/User';
import {plainToClass} from 'class-transformer';
import {buildSecureRouter} from '../auth_filter';

const userRouter = buildSecureRouter();


userRouter.get("/", (request: Request, response: Response) => {
    User.getAll().then(list => {
       response.json(list);
    }).catch(errors => {
        response.json(errors);
    })
});

userRouter.post("/", (request, response) => {

    const user = plainToClass(User, request.body as Object);
    user.add().then(user => {
        response.json(user);
    }).catch(errors => {
        response.json(errors);
    })
});

export { userRouter };
