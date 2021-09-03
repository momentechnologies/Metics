import gql from 'graphql-tag';
import Joi from 'joi';

export const schema = gql`
    type Query {
        test: Boolean
    }
`;

const passwordValidation = Joi.string().min(6).required();

export const resolvers = {
    Query: {
        test: () => true,
    },
};
