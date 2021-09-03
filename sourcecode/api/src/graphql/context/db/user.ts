import DataLoader from 'dataloader';
import db from '../../../services/db';

const getById = () =>
    new DataLoader(async (userIds) => {
        const users = await db('users').whereIn('id', userIds);

        return userIds.map((userId) =>
            users.find((user) => user.id === userId)
        );
    });

const getByEmail = () =>
    new DataLoader(async (emails) => {
        const users = await db('users').whereIn('email', emails);

        return emails.map((email) =>
            users.find((user) => user.email === email)
        );
    });

const create = async (user) => {
    const users = await db('users').insert(user).returning('*');

    return users[0];
};

const update = async (id, user) => {
    const users = await db('users').where('id', id).update(user).returning('*');

    return users[0];
};

export default () => ({
    getById: getById(),
    getByEmail: getByEmail(),
    create,
    update,
});
