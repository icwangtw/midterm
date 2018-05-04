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
    .select('customers.phone')
    .where({'orders.id': orderNum})
    .then((arrayOfResults) => arrayOfResults[0].phone)
    .catch(function(error) {
    console.error(error);
    })
  }


console.log(orderReady(3))
