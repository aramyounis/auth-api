exports.up = async function (knex) {
	//bo drustkrdni uuid idyake jyawaz  bo har userek
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

	return await knex.schema.createTable('users', (table) => {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table.string('user_name').notNullable();
		table.string('email').notNullable();
		table.string('passowrd').notNullable();
		table.boolean('status').defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = async function (knex) {
	knex.raw('drop extension if exists "uuid-ossp"');
	return await knex.schema.dropTable('users');
};
