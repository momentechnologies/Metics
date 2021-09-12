import DataLoader from 'dataloader';
import { dbHelpers } from '../../../services/db';

export default (db) => {
    const getById = () =>
        new DataLoader(async (projectIds) => {
            const projects = await db('projects').whereIn('id', projectIds);

            return projectIds.map((projectId) =>
                projects.find((project) => project.id === projectId)
            );
        });
    const getForGroup = () =>
        new DataLoader(async (groupIds: string[]) => {
            const projects = await db('projects').whereIn('groupId', groupIds);

            return groupIds.map((groupId) =>
                projects.filter(
                    (group) => String(group.groupId) === String(groupId)
                )
            );
        });
    const create = async (project: { name: string; groupId: number }) =>
        dbHelpers.create(db, 'projects', project);
    const update = async (id, project) =>
        dbHelpers.updateId(db, 'projectUsers', id, project);

    return {
        getById: getById(),
        getForGroup: getForGroup(),
        create,
        update,
    };
};
