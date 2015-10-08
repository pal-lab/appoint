Meteor.publish('appointment', function() {
  if (this.userId) {
    return Appointments.find({
      initiator: this.userId
    });
  } else {
    this.ready();
  }
});

Meteor.publish('users', function() {
  // return Appointments.find({userId: {$exists: false}});
  if (this.userId) {

    return Meteor.users.find({}, {
      emails: 1,
      profile: 1
    });
  } else {
    this.ready();
  }
});

Meteor.publish('appointmentinvitees', function(apId) {
  check(apId, String);
  if (this.userId) {
    var cursor = AppointmentInvitees.find({
      appointment: apId
    });

    return AppointmentInvitees.publishJoinedCursors(cursor);
  } else {
    this.ready();
  }
});

Meteor.publish('appointmentproposal', function(apId) {
  check(apId, String);
  if (this.userId) {
    var cursor = AppointmentProposals.find({
      appointment: apId
    });

    return AppointmentInvitees.publishJoinedCursors(cursor);
  } else {
    this.ready();
  }
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
