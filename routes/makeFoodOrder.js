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
const generateOrder = () => {
    knex('orders')
    .select('*')
    .insert({status: 'ordering'})
    .returning('id')
    .asCallback( function (err, result){
      if (err) {
        return console.error("error running query", err);
      }else{
        return result[0];
      }
    knex.destroy();
    });
}

const makeFoodOrder = (order_id,food_id,food_quantity) => {
    knex('food_orders')
    .insert({food_id: food_id,order_id: order_id, quantity : food_quantity})
    .asCallback( function (err, result){
      if (err) {
        return console.error("error running query", err);
      }else{
        return result;
      }
    knex.destroy();
    });
}

const orderTotal = (customer_id) => {
  knex('orders')
  .join('food_orders','orders.id','=','food_orders.order_id')
  .where({customer_id: customer_id})
  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }else{
     return result
    }
  knex.destroy();
  });
}

const setPrepTime = (order_id,prep_time) => {
  knex('orders')
  .insert({prep_time : prep_time})
  .where({order_id: order_id})
  .asCallback( function (err, result){
    if (err) {
      return console.error("error running query", err);
    }else{
     return result
    }
    knex.destroy();
  });
}

console.log(generateOrder());

exports.generateOrder = generateOrder;
exports.makeFoodOrder = makeFoodOrder;
exports.orderTotal = orderTotal;
exports.setPrepTime = setPrepTime;
