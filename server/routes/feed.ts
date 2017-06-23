import {Request, Response} from 'express';
import * as uuid from 'uuid';
import {buildSecureRouter} from '../auth_filter';

const feedRouter = buildSecureRouter();

feedRouter.post("/", (request: Request, response: Response) => {

  response.json({
    id: uuid.v4(),
    name: request.body.name,
    text: request.body.text,
  });

});

feedRouter.post("/:id/comment", (request: Request, response: Response) => {

  const feedID = request.params.id;

  response.json({
    comment: {
      id: uuid.v4(),
      text: request.body.text,
    },
    id: feedID,
  });

});

feedRouter.delete("/:id", (request: Request, response: Response) => {

  response.json({
    id: request.params.id,
  });

});

export { feedRouter };
