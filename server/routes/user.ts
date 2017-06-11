import { Request, Response, Router } from "express";
import { db } from "../db";
import {User} from '../model/User';
import {plainToClass} from 'class-transformer';

const userRouter: Router = Router();


userRouter.get("/", (request: Request, response: Response) => {

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
