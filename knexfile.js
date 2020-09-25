//export krdni confige databaseakaman
module.exports = {
	//kate devlopment
	development: {
		//jore databaseaka ka bakari ahenin
		client: 'postgresql',
		//linke databaseakaman
		connection: 'postgresql://postgres:root@localhost/onetwodb',
		migrations: {
			//shwene pashakawt buni migrationakan
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			//shwene pashakawtbuni seedakan
			directory: __dirname + '/db/seeds',
		},
	},
	//kate production
	production: {
		client: 'postgresql',
		//la kate production la regay enviorment varabile linke database waragren
		connection: process.env.DB_URI,
		migrations: {
			directory: __dirname + '/db/migrations',
		},
		seeds: {
			directory: __dirname + '/db/seeds',
		},
	},
};
