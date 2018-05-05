exports.up = function(knex, Promise) {
  return knex('categories').insert([{name: 'Entree'}, {name: 'Snack'}, {name: 'Drink'}])
};

exports.down = function(knex, Promise) {
  return knex('categories').where([{name: 'Entree'}, {name: 'Snack'}, {name: 'Drink'}]).del()
};
