import {Request, Response} from 'express';
import {User} from '../model/User';
import {plainToClass} from 'class-transformer';
import {AuthorizedRequest, buildSecureRouter} from '../auth_filter';
import {Project} from '../model/Project';

const projectRouter = buildSecureRouter();


projectRouter.get("/", (request: AuthorizedRequest, response: Response) => {
    Project.getAll(request.user.id).then(projects => {
        response.json(projects);
    });
});

projectRouter.post("/", (request: AuthorizedRequest, response) => {

    plainToClass(Project, request.body as Object).add(request.user.id)
    .then(project => {
        response.json(project);
    }).catch(errors => {
        response.json(errors);
    })
});

export { projectRouter };
