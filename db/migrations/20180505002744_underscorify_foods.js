
exports.up = function(knex, Promise) {
  return knex.raw("UPDATE foods SET name = replace(name, ' ', '_')");
};

exports.down = function(knex, Promise) {
  return knex.raw("UPDATE foods SET name = replace(name, '_', ' ')");
};
