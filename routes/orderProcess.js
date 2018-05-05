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

const addCInfo = (name, phone) => {
  return knex('customers')
          .select('*')
          .insert({name: name, phone:phone})
          .returning('id')
          .then((arrayOfResults) => arrayOfResults[0])
          .catch(function(err){
            console.error("error running query", err);
          })
}

const insertPrepTime = (orderNum, time) => {
  return knex('orders')
        .where({id:orderNum})
        .update({prep_time:time})
        .catch(function(err){
          console.error("error running query", err);
        })
}

const phoneNumLookup = (orderNum) => {
  return knex('customers')
        .join('orders', 'customers.id', '=', 'orders.customer_id')
        .select('phone')
        .where('orders.id', orderNum)
        .then((arrayOfResults) => arrayOfResults[0])
        .catch(function(err){
          console.error("error running query", err);
        })
}

exports.addCInfo = addCInfo;
exports.insertPrepTime = insertPrepTime;
exports.phoneNumLookup = phoneNumLookup;
