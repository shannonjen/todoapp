
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {task: 'eat lunch'},
        {task: 'solve problems'},
        {task: 'eat dessert'}
      ]);
    });
};
