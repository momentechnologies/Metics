import context from '../graphql/context';

export default (req, res, next) =>
    context(req, res)
        .then((context) => {
            req.context = context;
            next();
        })
        .catch(next);
