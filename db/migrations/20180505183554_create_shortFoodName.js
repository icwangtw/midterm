
exports.up = function(knex, Promise) {
  return knex('foods').where({ id: 5}).update({name: 'Caesar_Salad'})
};

exports.down = function(knex, Promise) {
  return knex('foods').where({ id: 5}).update({name: 'Ceaser_Salad'})
};

