const pg = require("pg");
const settings = require("./settings"); // settings.json
var input = process.argv[2];

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

knex('foods')
  .select('*')
  // .where({first_name: input})
  // .orWhere({last_name: input})
  .orderBy('id','asc')
  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }
    
    	console.log(result);


    });



