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
    const create = async (project: { name: string; groupId: number }) =>
        dbHelpers.create(db, 'projects', project);
    const update = async (id, project) =>
        dbHelpers.updateId(db, 'projectUsers', id, project);

    return {
        getById: getById(),
        create,
        update,
    };
};
