import { Request } from 'express';
import { Context } from '../graphql/context';
import { TokenUser } from './TokenUser';

export interface CustomRequest extends Request {
    context: Context;
    user: TokenUser;
}
