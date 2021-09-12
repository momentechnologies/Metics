import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import UpdateSubscription from './routes/UpdateSubscription';
import { BreadcrumbPath } from '../../../../../../../contexts/breadcrumb';

const Index = ({ match }) => {
    return (
        <BreadcrumbPath name="Billing" path={match.url}>
            <Switch>
                <Route path={match.path} component={Home} exact />
                <Route
                    path={`${match.path}/update-subscription`}
                    component={UpdateSubscription}
                />
                <Redirect to={match.path} />
            </Switch>
        </BreadcrumbPath>
    );
};

export default Index;
