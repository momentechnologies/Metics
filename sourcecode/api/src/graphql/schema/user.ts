import gql from 'graphql-tag';

export const schema = gql`
    type User {
        id: ID!
        email: String!
        firstName: String!
        lastName: String!
        emailConfirmed: Boolean!
        organizations: [Organization!]!
    }
`;

export const resolvers = {};
