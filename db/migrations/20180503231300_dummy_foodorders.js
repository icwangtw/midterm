exports.up = function(knex, Promise) {
  return knex('food_orders').insert([{food_id:1, order_id:1, quantity:2},
                                    {food_id:3, order_id:1, quantity:1},
                                    {food_id:6, order_id:1, quantity:3},
                                    {food_id:2, order_id:2, quantity:1},
                                    {food_id:7, order_id:2, quantity:1}])
};

exports.down = function(knex, Promise) {
  return kenx('food_orders').where([{order_id:1}, {order_id:2}]).del()
};
