exports.up = function(knex, Promise) {
return knex('customers').insert([{name:'Stephen', phone:'+16047044397'}, {name:'Abby', phone:'+12508991245'}, {name:'Doug', phone:'+17789994321'}])
};

exports.down = function(knex, Promise) {
return knex('customers').where([{name:'Stephen'}, {name:'Abby'}, {name:'Doug'}]).del()
};
