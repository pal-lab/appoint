Meteor.publish('users', function() {
  if (this.userId) {

    return Meteor.users.find({}, {
      emails: 1,
      profile: 1
    });
  } else {
    this.ready();
  }
});


Meteor.publish('appointment', function() {
  if (this.userId) {
    return Appointments.find({
      initiator: this.userId
    });
  } else {
    this.ready();
  }
});

Meteor.publish('appointmentinvitees', function(apId) {
  if (this.userId) {

    return Meteor.users.find({ 'profile.invitations': { $in: [ apId ] } }, {
      emails: 1,
      profile: 1
    });
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
    return cursor;
    // return AppointmentProposals.publishJoinedCursors(cursor);
  } else {
    this.ready();
  }
});
