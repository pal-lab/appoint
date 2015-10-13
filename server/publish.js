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
      _id: { $in: user.profile.invitations},
      status: { $ne: 'draft' }
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


Meteor.publish('myappointmentevents', function(invites) {
  if (this.userId) {
    return AppointmentEvents.find({appointment: {$in: invites}});;
  } else {
    this.ready();
  }
});



Meteor.publish('appointmentevents', function(apId) {
  if (this.userId) {
    return AppointmentEvents.find({
      appointment: apId
    });
  } else {
    this.ready();
  }
});
