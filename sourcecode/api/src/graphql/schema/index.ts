import _ from 'lodash';
import * as SchemaTools from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

import * as auth from './auth';
import directives from './directives';
import * as externalTypes from './externalTypes';
import * as group from './group';
import * as organization from './organization';
import * as project from './project';
import * as user from './user';

const get = (directiveTypes, services) => ({
    typeDefs: mergeTypeDefs([
        ...directiveTypes,
        ...services.map((s) => s.schema).filter((s) => s),
    ]),
    resolvers: services.reduce(
        (resolvers, service) =>
            service.resolvers
                ? _.merge({}, resolvers, service.resolvers)
                : resolvers,
        {}
    ),
});

export default directives.decorate(
    SchemaTools.makeExecutableSchema(
        get(directives.types, [
            auth,
            externalTypes,
            group,
            organization,
            project,
            user,
        ])
    )
);
