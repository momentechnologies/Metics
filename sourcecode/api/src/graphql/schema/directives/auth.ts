import { mapSchema, getDirectives, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';
import _ from 'lodash';
import { isLoggedIn } from '../../../services/authorization';
import { Context } from '../../context';
import Unauthorized from '../../../exceptions/unauthorized';

export default (directiveName: string = 'auth') => {
    return {
        authDirectiveTypeDefs: gql`
            enum AuthActions {
                READ
                WRITE
            }
            
            directive @${directiveName}(
                organizationIdPath: String
                groupIdPath: String
                action: AuthActions! = WRITE
            ) on FIELD_DEFINITION`,
        authDirectiveTransformer: (schema: GraphQLSchema) =>
            mapSchema(schema, {
                [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                    const authDirective = getDirectives(schema, fieldConfig, [
                        directiveName,
                    ])[directiveName];

                    if (authDirective) {
                        const { resolve: defaultFieldResolver } = fieldConfig;
                        fieldConfig.resolve = async (
                            source,
                            args,
                            context: Context,
                            info
                        ) => {
                            await isLoggedIn(context);

                            if (authDirective.organizationIdPath) {
                                const organizationId = _.get(
                                    args,
                                    authDirective.organizationIdPath
                                );

                                if (!organizationId) {
                                    throw new Unauthorized(
                                        'You do not have access to do that'
                                    );
                                }

                                const organizationUser = await context
                                    .db()
                                    .organization.getUserOrganization(
                                        context.user.id,
                                        organizationId
                                    );

                                if (!organizationUser) {
                                    throw new Unauthorized(
                                        'You do not have access to do that'
                                    );
                                }
                            }

                            if (authDirective.groupIdPath) {
                                const groupId = _.get(
                                    args,
                                    authDirective.groupIdPath
                                );

                                if (!groupId) {
                                    throw new Unauthorized(
                                        'You do not have access to do that'
                                    );
                                }

                                const group = await context
                                    .db()
                                    .group.getById.load(groupId);

                                if (!group) {
                                    throw new Unauthorized(
                                        'You do not have access to do that'
                                    );
                                }

                                const organizationUser = await context
                                    .db()
                                    .organization.getUserOrganization(
                                        context.user.id,
                                        group.organizationId
                                    );

                                if (!organizationUser) {
                                    throw new Unauthorized(
                                        'You do not have access to do that'
                                    );
                                }
                            }

                            return await defaultFieldResolver(
                                source,
                                args,
                                context,
                                info
                            );
                        };
                        return fieldConfig;
                    }
                },
            }),
    };
};
