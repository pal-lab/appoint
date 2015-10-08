
Meteor.publish('appointments', function() {
  // return Appointments.find({userId: {$exists: false}});
  var test = Appointments.find();
  console.log('publish appointments'+ test.count());
  return test;
});

// Meteor.publish('privateLists', function() {
//   if (this.userId) {
//     return Lists.find({userId: this.userId});
//   } else {
//     this.ready();
//   }
// });

// Meteor.publish('todos', function(listId) {
//   check(listId, String);

//   return Todos.find({listId: listId});
// });
