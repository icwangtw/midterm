
exports.up = function(knex, Promise) {
    return knex('foods').where({ id: 4}).update({name: 'Turkey_Sandwich'})
};

exports.down = function(knex, Promise) {
    return knex('foods').where({ id: 4}).update({name: 'Turkey_and_Provolone_Sandwich'})
};
