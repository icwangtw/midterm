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

// Insert into orders table

function makeOrder(order_id,customer_id,prep_time,ordered_time,status){

    knex('orders').insert({order_id: order_id},{customer_id: customer_id},{prep_time : prep_time},
                               {ordered_time: ordered_time},{status: status});
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

exports.makeOrder = makeOrder(order_id,customer_id,prep_time,ordered_time,status);
