import db from './db';
import { Response } from 'express';
import { CustomRequest } from '../../types/CustomRequest';

export const buildRawContext = () => ({
    db: db(),
});

const getContext = async (req: CustomRequest, res: Response) => {
    const rawContext = buildRawContext();

    return {
        user: req.user,
        res,
        req,
        ...rawContext,
    };
};

export default getContext;
