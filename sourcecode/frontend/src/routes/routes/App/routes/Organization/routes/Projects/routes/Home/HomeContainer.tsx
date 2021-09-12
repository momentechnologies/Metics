import React from 'react';
import Home from './Home';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../../../../../../containers/DefaultHookQuery';
import OrganizationContext from '../../../../../../../../../contexts/organization';

const groupsAndProjectsQuery = gql`
    query GroupsAndProjects($organizationId: ID!) {
        organization(id: $organizationId) {
            groups {
                id
                name
                projects {
                    id
                    name
                }
            }
        }
    }
`;

const HomeContainer = ({ match }) => {
    const { organization } = React.useContext(OrganizationContext);

    return (
        <DefaultHookQuery
            queryHookData={useQuery(groupsAndProjectsQuery, {
                variables: {
                    organizationId: organization.id,
                },
            })}
        >
            {({ data }) => (
                <Home
                    groups={data.organization.groups}
                    currentUrl={match.url}
                />
            )}
        </DefaultHookQuery>
    );
};

export default HomeContainer;
