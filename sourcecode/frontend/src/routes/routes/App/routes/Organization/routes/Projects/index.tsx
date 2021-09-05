import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Create from './routes/Create';
import Project from './routes/Project';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={Home} />
            <Route exact path={`${match.path}/create`} component={Create} />
            <Route
                exact
                path={`${match.path}/:projectId`}
                component={Project}
            />
            <Redirect to={match.path} />
        </Switch>
    );
};

export default Index;
