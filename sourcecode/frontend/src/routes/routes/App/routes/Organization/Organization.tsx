import React from 'react';
import AppPage from '../../../../../components/AppPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import Projects from './routes/Projects';
import Billing from './routes/Billing';

const Organization = ({ match }) => {
    return (
        <AppPage>
            <Switch>
                <Route path={`${match.path}/projects`} component={Projects} />
                <Route path={`${match.path}/billing`} component={Billing} />
                <Redirect to={`${match.path}/projects`} />
            </Switch>
        </AppPage>
    );
};

export default Organization;
