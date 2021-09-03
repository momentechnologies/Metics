exports.up = function (knex) {
    return knex.schema.createTable('organizationUsers', function (table) {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table
            .integer('organizationId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('organizations')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('role', 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('organizationUsers');
};
