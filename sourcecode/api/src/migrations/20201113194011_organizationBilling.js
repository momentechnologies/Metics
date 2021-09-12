exports.up = function (knex) {
    return knex.schema.table('organizations', function (table) {
        table.string('stripeCustomerId', 255).nullable().defaultTo(null);
        table.string('billingCountryCode', 2).nullable().defaultTo(null);
        table.string('billingOrganizationName', 255).nullable().defaultTo(null);
        table.text('billingAddress').nullable().defaultTo(null);
        table.text('billingEmail').nullable().defaultTo(null);
    });
};

exports.down = function (knex) {
    return knex.schema.table('organizations', function (table) {
        table.dropColumn('stripeCustomerId');
        table.dropColumn('billingCountryCode');
        table.dropColumn('billingOrganizationName');
        table.dropColumn('billingAddress');
        table.dropColumn('billingEmail');
    });
};
