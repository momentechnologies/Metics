exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table
            .integer('groupId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('groups')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table
            .timestamp('updatedAt', { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .timestamp('createdAt', { useTz: true })
            .notNullable()
            .defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
