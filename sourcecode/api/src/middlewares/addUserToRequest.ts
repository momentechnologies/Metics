import * as Token from '../services/token';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export default (req: CustomRequest, res: Response, next: NextFunction) => {
    req.user = null;

    const authToken = req.cookies && req.cookies.authToken;

    if (!authToken) {
        return next();
    }

    const payload = Token.verify(req.cookies.authToken);

    if (!payload) {
        return next();
    }

    req.user = payload.payload.user;
    next();
};
