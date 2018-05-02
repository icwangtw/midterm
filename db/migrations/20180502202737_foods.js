exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable('foods', function(table){
        table.increments('id').primary();
        table.string('name');
        table.integer('price');
        table.string('description');
        table.string('availability');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods').dropTable('famous_people')
  ]);
};
