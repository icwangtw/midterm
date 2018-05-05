exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(table){
    table.foreign('customer_id').references('customers.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(table){
    table.dropForeign('customer_id');
  });
};
