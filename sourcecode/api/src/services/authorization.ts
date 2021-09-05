import NotLoggedInException from '../exceptions/notLoggedIn';
import { Context } from '../graphql/context';

export const isLoggedIn = async (
    context: Context,
    throwError: boolean = true
) => {
    if (!context.user) {
        if (throwError) {
            throw new NotLoggedInException();
        }

        return false;
    }

    return true;
};
