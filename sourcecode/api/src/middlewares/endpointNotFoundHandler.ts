import EndpointNotFoundException from '../exceptions/endpointNotFound';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    next(new EndpointNotFoundException(req.url, req.method));
};
