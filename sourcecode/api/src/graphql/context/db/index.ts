import user from './user';
import defaultDb from '../../../services/db';
import { Knex } from 'knex';
import organization from './organization';
import group from './group';
import project from './project';

export default (db: Knex = defaultDb) => ({
    group: group(db),
    organization: organization(db),
    project: project(db),
    user: user(db),
});
