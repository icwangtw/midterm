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

orderReady = (orderNum) => {
    knex('customers')
    .join('orders', 'customers.id', '=', 'orders.customer_id')
    .select('phone')
    .where('orders.id', orderNum)
    .asCallback( function (err, result){
      if (err) {
        return console.error("error running query", err);
      }
        return result;
  });
  }
// module.exports = orderReady(orderNum)

console.log(orderReady(1))
