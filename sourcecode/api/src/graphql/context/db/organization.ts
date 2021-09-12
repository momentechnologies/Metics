import DataLoader from 'dataloader';
import { dbHelpers } from '../../../services/db';
import { Organization } from '../../../types/db/Organization';

export default (db) => {
    const getById = () =>
        new DataLoader<string, Organization>(
            async (organizationIds: string[]) => {
                const organizations = await db('organizations').whereIn(
                    'id',
                    organizationIds
                );

                return organizationIds.map((organizationId) =>
                    organizations.find(
                        (organization) =>
                            String(organization.id) === String(organizationId)
                    )
                );
            }
        );

    const getUserOrganizations = async (userId) =>
        db
            .select('o.*')
            .from('organizationUsers as ou')
            .join('organizations as o', 'o.id', 'ou.organizationId')
            .where('ou.userId', userId);

    const getUserOrganization = async (userId, organizationId) =>
        db('organizationUsers as ou')
            .where('ou.userId', userId)
            .where('ou.organizationId', organizationId)
            .first();

    const create = async (organization: { name: string }) =>
        dbHelpers.create(db, 'organizations', organization);

    const createOrganizationUser = async (organizationUser: {
        organizationId: string;
        userId: string;
        role: string;
    }) => dbHelpers.create(db, 'organizationUsers', organizationUser);

    const update = async (id, organization) =>
        dbHelpers.updateId(db, 'organizationUsers', id, organization);

    return {
        getById: getById(),
        create,
        createOrganizationUser,
        update,
        getUserOrganizations,
        getUserOrganization,
    };
};
