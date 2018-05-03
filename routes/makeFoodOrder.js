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

function makeFoodOrder(order_id,food_id,food_quantity){
  if(order_id === 'temporary'){
    console.log("makeFoodOrder => inside");
    // knex('orders').insert({order_id: order_id},{customer_id: customer_id},{prep_time : prep_time},
    //                            {ordered_time: ordered_time},{status: status});
    knex('orders')
    .returning('id')
    .insert({customer_id: '3'},{prep_time : '15'},{ordered_time: '2018-10-19 10:23:54+02'},{status: 'in progress'})
    .asCallback( function (err, result){
      if (err) {
        return console.error("error running query", err);
      }
        return result;
    });

  }else{
  
    // // let returnFoods = knex('food_orders')
    // knex('food_orders').insert({food_id: food_id},{order_id: ordered_id},{quantity : food_quantity});
    // .then( function (result) {
    //       // res.json({ success: true, message: 'ok' });     // respond back to request
    //       console.log(result);
    //    })

    // .asCallback( function (err, result){
    //   if (err) {
    //     return console.error("error running query", err);
    //   }
    //     return result;
    // });
  }
}
module.exports = makeFoodOrder();

// knex('customers').insert({name : customer_name},{phone : customer_phone});
// knex('orders').insert({prep_time: prep_time},{ordered_time: ordered_time},{status: status});
// var order_id, prep_time, ordered_time, status, //orders table
//     customer_name, customer_phone,  // customers table
//     food_quantity,  //food_orders table 
//     food_id, food_name, food_availability, food_price, food_description, category_id;  //foods table