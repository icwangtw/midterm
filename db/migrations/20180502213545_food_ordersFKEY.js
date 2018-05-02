exports.up = function(knex, Promise) {
  return knex.schema.alterTable('food_orders', function(table){
    table.foreign('food_id').references('foods.id');
    table.foreign('order_id').references('orders.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('food_orders', function(table){
    table.dropForeign('food_id');
    table.dropForeign('order_id');
  });
};
