//dyari krdni kate devlopment w production
const envirorment = process.env.NODE_ENV || 'development';

//import krdne file knexakaman ka confige tyaya
const config = require('../knexfile')[envirorment];

//import krdne package knex
const knex = require('knex');

//drustkrdne connection lagal databaseakaman la regay consturcture knex
const connection = knex(config);

//export krdni connectionakaman la har shweneke tr bange kainawa atwanin bakari bhenin
module.exports = connection;
