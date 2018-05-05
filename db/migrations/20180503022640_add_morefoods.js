exports.up = function(knex, Promise) {
  return knex('foods').insert([{name:'Pepperoni Pizza/Slice', price: 100, description: 'One Slice of Pepperoni Pizza',  availability:'yes' , category_id:1},
                              {name:'Pepperoni Pizza/Whole', price: 800, description: 'Whole Pepperoni Pizza (cut 12 slices)',  availability:'yes' , category_id:1},
                              {name:'Turkey and Provolone Sandwich', price: 500, description: 'Tureky, Provolone, Tomato, Onion, Pesto',  availability:'yes' , category_id:1},
                              {name:'Ceaser Salad', price: 500, description: 'For the whole family to share',  availability:'yes' , category_id:1},
                              {name:'Ice Cream', price: 200, description: 'Everyones favourite',  availability:'yes' , category_id:2},
                              {name:'French Fries', price: 200, description: 'The perfect side',  availability:'yes' , category_id:2},
                              {name:'Soda', price: 200, description: 'Quench your thirst',  availability:'yes' , category_id:3},
                              {name:'Coffee', price: 200, description: 'Taste as good as it smells',  availability:'yes' , category_id:3},
                              {name:'Water', price: 100, description: 'Quench your thirst',  availability:'yes' , category_id:3}])
};
exports.down = function(knex, Promise) {
  return knex('foods').where({ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }).del()
};
