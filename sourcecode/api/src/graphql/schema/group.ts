import gql from 'graphql-tag';
import { Context } from '../context';

export const schema = gql`
    type Group {
        id: ID!
        name: String!
        organizationId: ID!
        projects: [Project!]!
    }
`;

export const resolvers = {
    Organization: {
        groups: async ({ id }, args, context: Context) =>
            await context.db().group.getForOrganization.load(id),
    },
};
