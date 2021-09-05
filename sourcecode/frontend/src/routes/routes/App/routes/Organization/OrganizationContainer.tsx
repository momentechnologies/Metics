import React from 'react';
import Organization from './Organization';
import AuthContext from '../../../../../contexts/auth';
import OrganizationContext from '../../../../../contexts/organization';

const OrganizationContainer = ({ match }) => {
    const { organizations } = React.useContext(AuthContext);

    return (
        <OrganizationContext.Provider
            value={{
                organization: organizations.find(
                    (o) => String(o.id) === match.params.organizationId
                ),
                paths: {
                    root: match.url,
                    projects: `${match.url}/projects`,
                },
            }}
        >
            <Organization match={match} />
        </OrganizationContext.Provider>
    );
};

export default OrganizationContainer;
