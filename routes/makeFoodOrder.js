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

var order_id,food_id,food_quantity;
//Insert into food_orders table
function generateOrder(){
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

function makeFoodOrder(order_id,food_id,food_quantity){

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

function orderTotal(customer_id){
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

// console.log(generateOrder());
console.log(generateOrder())

exports.generateOrder = generateOrder;
exports.makeFoodOrder = makeFoodOrder;
exports.orderTotal = orderTotal;

// knex('customers').insert({name : customer_name},{phone : customer_phone});
// knex('orders').insert({prep_time: prep_time},{ordered_time: ordered_time},{status: status});
// var order_id, prep_time, ordered_time, status, //orders table
//     customer_name, customer_phone,  // customers table
//     food_quantity,  //food_orders table
//     food_id, food_name, food_availability, food_price, food_description, category_id;  //foods table
