const pg = require("pg");
const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  }
});

let returnFoods = knex('foods')
  .select('*')
  .orderBy('id','asc')
  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }
      return result;
    });
