import React from 'react';
import Create from './Create';
import useMutation from '../../../../../../../../../hooks/useMutation';
import { gql, useQuery } from '@apollo/client';
import DefaultHookQuery from '../../../../../../../../../containers/DefaultHookQuery';
import OrganizationContext from '../../../../../../../../../contexts/organization';
import { useHistory } from 'react-router-dom';

const organizationGroupsQuery = gql`
    query OrganizationGroups($organizationId: ID!) {
        organization(id: $organizationId) {
            groups {
                id
                name
            }
        }
    }
`;

const createProjectMutation = gql`
    mutation CreateProject($data: CreateProjectInput!) {
        createProject(data: $data) {
            id
            name
        }
    }
`;

const CreateContainer = () => {
    const history = useHistory();
    const { organization, paths } = React.useContext(OrganizationContext);
    const { mutate: create, status: createStatus } = useMutation(
        createProjectMutation,
        {
            message:
                'Something happened while creating this project. Please refresh or try later.',
            key: 'server_error',
            error: {},
        }
    );

    return (
        <DefaultHookQuery
            queryHookData={useQuery(organizationGroupsQuery, {
                variables: {
                    organizationId: organization.id,
                },
            })}
        >
            {({ data }) => (
                <Create
                    create={(variables) => {
                        create(variables, ({ createProject }) => {
                            history.push(
                                paths.projects + '/' + createProject.id
                            );
                        });
                    }}
                    status={createStatus}
                    groups={data.organization.groups}
                    organization={organization}
                />
            )}
        </DefaultHookQuery>
    );
};

export default CreateContainer;
