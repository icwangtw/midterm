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

var returningFoodItems = (categoryID, exportName) => {
  knex('foods')
  .select('*')
  .orderBy('id','asc')
  .where('category_id', categoryID)
  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }
    exports[exportName] = result;
      return result;
  });

};

returningFoodItems("1", "catOne");
returningFoodItems("2", "catTwo");
returningFoodItems("3", "catThree");

