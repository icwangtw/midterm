exports.up = function(knex, Promise) {
  return knex('foods').insert({name:'Hot Dog', price: 150, description: 'Our best deal since 1985'})
};

exports.down = function(knex, Promise) {
  return knex('foods').where({ id: 2 }).del()
};
