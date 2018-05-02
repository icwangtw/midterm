exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('food_orders', function(table){
        table.increments('id').primary();
        table.integer('quantity');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('food_orders').dropTable('famous_people')
  ]);
};
