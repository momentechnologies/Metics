import DataLoader from 'dataloader';
import { dbHelpers } from '../../../services/db';

export default (db) => {
    const getById = () =>
        new DataLoader(async (groupIds: string[]) => {
            const groups = await db('groups').whereIn('id', groupIds);

            return groupIds.map((groupId) =>
                groups.find((group) => String(group.id) === String(groupId))
            );
        });
    const getForOrganization = () =>
        new DataLoader(async (organizationIds: string[]) => {
            const groups = await db('groups').whereIn(
                'organizationId',
                organizationIds
            );

            return organizationIds.map((organizationId) =>
                groups.filter(
                    (group) =>
                        String(group.organizationId) === String(organizationId)
                )
            );
        });
    const create = async (group: { name: string; organizationId: number }) =>
        dbHelpers.create(db, 'groups', group);
    const update = async (id, group) =>
        dbHelpers.updateId(db, 'groupUsers', id, group);

    return {
        getById: getById(),
        getForOrganization: getForOrganization(),
        create,
        update,
    };
};
