import gql from 'graphql-tag';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import validateJoi from '../../services/validateJoi';
import { Context } from '../context';
import ValidationException, {
    validationError,
    validationTypes,
} from '../../exceptions/validation';
import asyncTransaction from '../../services/asyncTransaction';
import organizationUserRoles from '../../constants/organizationUserRoles';
import { addJwtToResponse } from '../../services/token';
import NotFoundException from '../../exceptions/notFound';

export const schema = gql`
    type Query {
        auth: AuthResponse @auth
    }

    type Mutation {
        createAccount(data: CreateAccountInput): Boolean
    }

    input CreateAccountInput {
        organizationName: String!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        acceptTermsAndPolicy: Boolean!
    }

    type AuthResponse {
        user: User
    }
`;

const createAccountValidation = Joi.object({
    organizationName: Joi.string().min(2).max(100).required(),
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .max(255)
        .required(),
    password: Joi.string().min(8).max(255).required(),
    acceptTermsAndPolicy: Joi.boolean().invalid(false).required(),
});

export const resolvers = {
    Query: {
        auth: async (_, args, context: Context) => {
            const user = await context.db().user.getById.load(context.user.id);

            if (!user) {
                throw new NotFoundException('user');
            }

            return {
                user,
            };
        },
    },
    Mutation: {
        createAccount: async (
            _,
            { data: preValidationData },
            context: Context
        ) => {
            const data = validateJoi(
                preValidationData,
                createAccountValidation
            );

            const existingUser = await context
                .db()
                .user.getByEmail.load(data.email);

            if (existingUser) {
                throw new ValidationException(
                    validationError(
                        'email',
                        'Email is already in use',
                        validationTypes.ALREADY_EXISTS
                    )
                );
            }

            let user;
            await asyncTransaction(async (transaction) => {
                user = await context.db(transaction).user.create({
                    email: data.email,
                    password: bcrypt.hashSync(data.password, 10),
                    firstName: data.firstName,
                    lastName: data.lastName,
                });

                const organization = await context
                    .db(transaction)
                    .organization.create({
                        name: data.organizationName,
                    });

                await context
                    .db(transaction)
                    .organization.createOrganizationUser({
                        organizationId: organization.id,
                        userId: user.id,
                        role: organizationUserRoles.ADMIN,
                    });

                await context.db(transaction).group.create({
                    organizationId: organization.id,
                    name: `Default group`,
                });
            });

            await addJwtToResponse(context.res, user);

            return true;
        },
    },
};
