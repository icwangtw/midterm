exports.up = function(knex, Promise) {
return knex('orders').insert([{customer_id:1, prep_time:20, ordered_time:'2018-05-03 10:23:54-08', status:'In progress'},
                                  {customer_id:3, prep_time:25, ordered_time:'2018-05-03 11:22:54-08', status:'In progress'}])
};

exports.down = function(knex, Promise) {
return knex('orders').where({customer_id:1}, {customer_id:3}).del()
};
