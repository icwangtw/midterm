exports.up = function(knex, Promise) {
 return knex('foods').where({ id: 1 }).update({ id: 2})
};

exports.down = function(knex, Promise) {
  return knex('foods').where({ id: 2 }).update({ id: 1 })
};
