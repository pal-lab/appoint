Meteor.appointmentQueries = {};

// counting how my acknowledgments for a certain event
Meteor.appointmentQueries.myAcknowledgment = function(appointmentId) {
  return AppointmentEvents.find({
    $and: [{
      appointment: appointmentId,
      account: Meteor.userId()
    }, {
      $or: [{
        type: 'approved'
      }, {
        type: 'declined'
      }]
    }]
  }).count();
};

Meteor.appointmentQueries.scheduleEvent = function(appointmentId) {
  return AppointmentEvents.find({
    appointment: appointmentId,
    type: 'scheduled'
  }).count();
};


Meteor.appointmentQueries.invitedEvent = function(appointmentId) {
  return AppointmentEvents.find({
    appointment: appointmentId,
    type: 'invited'
  }).count();
};


Meteor.appointmentQueries.approved = function(appointmentId) {
  return AppointmentEvents.find({
    appointment: appointmentId,
    type: 'approved'
  }).count();
};


Meteor.appointmentQueries.proposedDates = function(appointmentId) {
  return AppointmentEvents.find({
    appointment: appointmentId,
    type: 'proposed'
  }).count();
};


Meteor.appointmentQueries.votedProposals = function(appointmentId) {
  return AppointmentEvents.find({
    $and: [{
      appointment: appointmentId
    }, {
      $or: [{
        type: 'accepted'
      }, {
        type: 'rejected'
      }]
    }]
  }).count();
};

// total acknowledgments of invited users
Meteor.appointmentQueries.totalAnswers = function(appointmentId) {
  return AppointmentEvents.find({
    $and: [{
      appointment: appointmentId
    }, {
      $or: [{
        type: 'approved'
      }, {
        type: 'declined'
      }]
    }]
  }).count();
};

// all invited users for a certain appointment
Meteor.appointmentQueries.invitedUsers = function(appointmentId) {
  return Meteor.users.find({
    'profile.invitations': {
      $in: [appointmentId]
    }
  }).count();
};
