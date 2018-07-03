
exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table){
    table.increments();
    table.string('task').notNullable().defaultTo('');
    table.timestamps(true,true);
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos');
};
