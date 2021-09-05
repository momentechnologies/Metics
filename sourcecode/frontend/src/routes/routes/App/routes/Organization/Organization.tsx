import React from 'react';
import AppPage from '../../../../../components/AppPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import Projects from './routes/Projects';

const Organization = ({ match }) => {
    return (
        <AppPage>
            <Switch>
                <Route path={`${match.path}/projects`} component={Projects} />
                <Redirect to={`${match.path}/projects`} />
            </Switch>
        </AppPage>
    );
};

export default Organization;
