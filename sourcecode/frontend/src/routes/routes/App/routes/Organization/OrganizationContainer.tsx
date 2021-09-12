import React from 'react';
import Organization from './Organization';
import AuthContext from '../../../../../contexts/auth';
import OrganizationContext from '../../../../../contexts/organization';
import { BreadcrumbPath } from '../../../../../contexts/breadcrumb';

const OrganizationContainer = ({ match }) => {
    const { organizations } = React.useContext(AuthContext);

    const organization = organizations.find(
        (o) => String(o.id) === match.params.organizationId
    );

    return (
        <OrganizationContext.Provider
            value={{
                organization,
                paths: {
                    root: match.url,
                    projects: `${match.url}/projects`,
                },
            }}
        >
            <BreadcrumbPath name={organization.name} path={match.url}>
                <Organization match={match} />
            </BreadcrumbPath>
        </OrganizationContext.Provider>
    );
};

export default OrganizationContainer;
