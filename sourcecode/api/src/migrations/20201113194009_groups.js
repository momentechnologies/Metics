exports.up = function (knex) {
    return knex.schema.createTable('groups', function (table) {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table
            .integer('organizationId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('organizations')
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
    return knex.schema.dropTable('groups');
};
