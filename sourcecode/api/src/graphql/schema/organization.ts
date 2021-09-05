import gql from 'graphql-tag';
import { Context } from '../context';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Query {
        organization(id: ID!): Organization @auth(organizationIdPath: "id")
    }

    type Organization {
        id: ID!
        name: String!
        groups: [Group!]!
    }
`;

export const resolvers = {
    Query: {
        organization: async (user, { id }, context: Context) => {
            const organization = await context
                .db()
                .organization.getById.load(id);

            if (!organization) {
                throw new NotFoundException('organization');
            }

            return organization;
        },
    },
    User: {
        organizations: async (user, args, context: Context) => {
            return context
                .db()
                .organization.getUserOrganizations(context.user.id);
        },
    },
};
