import {Request, Response} from 'express';
import {User} from '../model/User';
import {plainToClass} from 'class-transformer';
import {AuthorizedRequest, buildSecureRouter} from '../auth_filter';

const userRouter = buildSecureRouter();


userRouter.get("/", (request: AuthorizedRequest, response: Response) => {

    console.log(request.user);
    User.getAll().then(list => {
       response.json(list);
    }).catch(errors => {
        response.json(errors);
    })
});

userRouter.post("/", (request, response) => {

    const user = plainToClass(User, request.body as Object) as User;
    user.add().then(user => {
        response.json(user);
    }).catch(errors => {
        response.json(errors);
    })
});

export { userRouter };
