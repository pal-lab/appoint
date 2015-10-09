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


Meteor.publish('appointment', function(user) {
  if (this.userId && user && this.userId === user._id) {
    var user = Meteor.users.findOne(this.userId);
    return Appointments.find( {$or : [{
      initiator: this.userId
  }, {
      _id: { $in: user.profile.invitations}
  }]});
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
