const pg = require("pg");
const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  }
});


//Insert into food_orders table
// () => Promise<{id: orderId}>
const generateOrder = () => {
  return knex('orders')
          .select('*')
          .insert({status: 'ordering'})
          .returning('id')
          .then((arrayOfResults) => arrayOfResults[0])
}

const makeFoodOrder = (order_id,food_id,food_quantity) => {
  return knex('food_orders')
          .insert({food_id: food_id,order_id: order_id, quantity : food_quantity})
          .then((arrayOfResults) => arrayOfResults)
          .catch(function(err){
            console.error("error running query", err);
          })

}

const orderTotal = (customer_id) => {
  return knex('orders')
          .join('food_orders','orders.id','=','food_orders.order_id')
          .where({customer_id: customer_id})
          .then((arrayOfResults) => arrayOfResults)
          .catch(function(err){
            console.error("error running query", err);
          })
}

const setPrepTime = (order_id,prep_time) => {
  return knex('orders')
          .select('*')
          .insert({prep_time : prep_time})
          .where({id: order_id})
          .then((arrayOfResults) => arrayOfResults)
          .catch(function(err){
            console.error("error running query", err);
          })
}


exports.generateOrder = generateOrder;
exports.makeFoodOrder = makeFoodOrder;
exports.orderTotal = orderTotal;
exports.setPrepTime = setPrepTime;
