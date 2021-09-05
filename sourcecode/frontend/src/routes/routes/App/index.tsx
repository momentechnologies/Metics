import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContext from '../../../contexts/auth';
import Organization from './routes/Organization';

const Index = ({ match }) => {
    const { organizations } = React.useContext(AuthContext);

    if (organizations.length === 0) {
        return <div>no organizations</div>;
    }

    return (
        <Switch>
            <Route
                path={`${match.path}/:organizationId`}
                component={Organization}
            />
            <Redirect to={`${match.path}/${organizations[0].id}`} />
        </Switch>
    );
};

export default Index;
