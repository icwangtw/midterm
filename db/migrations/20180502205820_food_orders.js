exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('food_orders', function(table){
        table.increments('id').primary();
        table.integer('quantity');
        table.integer('food_id');
        table.integer('order_id');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('food_orders')
  ]);
};
