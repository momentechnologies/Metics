import express from 'express';
import graphqlRoutes from '../graphql';
import addContextToRequest from '../middlewares/addContextToRequest';
import addUserToRequest from '../middlewares/addUserToRequest';

const { Router } = express;

const router = Router();
const apiRouter = Router();

apiRouter.use(graphqlRoutes);

apiRouter.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Metics API',
        data: {
            releaseDate: process.env.BUILD_DATE,
            commitHash: process.env.COMMIT_REF,
        },
    });
});

router.use('/api/v1', addUserToRequest, addContextToRequest, apiRouter);

export default router;
