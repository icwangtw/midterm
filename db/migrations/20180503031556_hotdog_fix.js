exports.up = function(knex, Promise) {
 return knex('foods').where({ name: 'Hot Dog'}).update({availability: 'yes', category_id: 1})
};

exports.down = function(knex, Promise) {
  return knex('foods').where({ name:'Hot Dog'}).update({availability: 'yes', category_id: 1})
};

