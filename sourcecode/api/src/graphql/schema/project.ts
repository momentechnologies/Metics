import gql from 'graphql-tag';
import { Context } from '../context';

export const schema = gql`
    type Mutation {
        createProject(data: CreateProjectInput!): Project
            @auth(groupIdPath: "data.groupId")
    }

    type Project {
        id: ID!
        name: String!
    }

    input CreateProjectInput {
        groupId: ID!
        name: String!
    }
`;

export const resolvers = {
    Mutation: {
        createProject: async (_, { data }, context: Context) =>
            await context.db().project.create(data),
    },
    Group: {
        projects: async ({ id: groupId }, _, context: Context) =>
            context.db().project.getForGroup.load(groupId),
    },
};
