Meteor.publish('appointment', function() {
  // return Appointments.find({userId: {$exists: false}});

  // Appointments.find({}, function(err, results) {
  //   console.log(results.invitee);
  // });

  return Appointments.find();
});

Meteor.publish('users', function() {
  // return Appointments.find({userId: {$exists: false}});
  return Meteor.users.find({}, {
    emails: 1,
    profile: 1
  });
});

Meteor.publish('appointmentinvitees', function(apId) {
  check(apId, String);

  return AppointmentInvitees.find({appointment: apId});
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
