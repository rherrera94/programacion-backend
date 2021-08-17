const knex=require('knex');
const knexfile=require('./knexfile');
const{NODE_ENV, CSQLITE3}=require('../../config/globals');
const db=knex(knexfile[NODE_ENV]);
const dbsqlite3=knex(knexfile[CSQLITE3]);
module.exports={db,dbsqlite3};