exports.up = function(knex, Promise) {
  return knex.schema.table('foods', table => {
    table.integer('category_id');
    table.foreign('category_id').references('categories.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('foods', function(table){
     table.dropColumn('category_id');
  });
};
