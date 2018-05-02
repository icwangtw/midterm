exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('customers', function(table){
        table.increments('id').primary();
        table.string('name');
        table.string('phone');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers').dropTable('famous_people')
  ]);
};
