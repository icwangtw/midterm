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

// Insert into customers table

function makeCustomer(customer_id, customer_name, customer_phone){
   
  knex('customers').insert({customer_id: customer_id},{customer_name: customer_name},{customer_phone : customer_phone});
  .then( function (result) {
        res.json({ success: true, message: 'ok' });     // respond back to request
     })

  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }
      return result;
  });
}

exports.makeOrder = makeCustomer(customer_id, customer_name, customer_phone);