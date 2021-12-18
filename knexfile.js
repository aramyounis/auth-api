//export krdni confige databaseakaman
module.exports = {
  //kate devlopment
  development: {
    //jore databaseaka ka bakari ahenin
    client: "pg",
    //linke databaseakaman
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "1081995",
      database: "auth_db",
      charset: "utf8",
    },
    migrations: {
      //shwene pashakawt buni migrationakan
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      //shwene pashakawtbuni seedakan
      directory: __dirname + "/db/seeds",
    },
  },
  //kate production
  production: {
    client: "postgresql",
    //la kate production la regay enviorment varabile linke database waragren
    connection: process.env.DB_URI,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
