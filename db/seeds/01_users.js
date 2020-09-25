exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{ user_name: 'aramyunis', email: 'aramyunis@gmail.com', passowrd: 'aram11' },
				{ user_name: 'hawkar', email: 'hawkar@gmail.com', passowrd: 'hawkar' },
			]);
		});
};
