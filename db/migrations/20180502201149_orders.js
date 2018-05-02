exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('orders', function(table){
        table.increments('id').primary();
        table.integer('prep_time');
        table.timestamp('ordered_time');
        table.string('status');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders').dropTable('famous_people')
  ]);
};
