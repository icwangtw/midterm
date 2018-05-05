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
          .catch(function(err){
            console.error("error running query", err);
          })
}

const makeFoodOrder = (order_id,food_id,food_quantity) => {
  return knex('food_orders')
          .insert({food_id: food_id,order_id: order_id, quantity : food_quantity})
          .then((arrayOfResults) => arrayOfResults)
          .catch(function(err){
            console.error("error running query", err);
          })

}

const orderTotal = (order_id) => {
  return knex('food_orders')
          .select('food_id','quantity')
          .where({order_id: order_id})
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

const foodName = (order_id) => {
 return knex('food_orders')
         .join('foods', 'foods.id', '=', 'food_orders.food_id')
         .select('foods.name','food_orders.quantity')
         .where({'food_orders.order_id': order_id})
          .then((arrayOfResults) => arrayOfResults)
         .catch(function(err){
           console.error("error running query", err);
         })
}

exports.generateOrder = generateOrder;
exports.makeFoodOrder = makeFoodOrder;
exports.orderTotal = orderTotal;
exports.setPrepTime = setPrepTime;
exports.foodName = foodName;
