Meteor.appointmentQueries = {};

// counting how my acknowledgments for a certain event
Meteor.appointmentQueries.hasAcknowledgment = function(appointmentId) {
  return (AppointmentEvents.find({
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
  }).count() > 0);
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
  }).count()-1;
};

Meteor.appointmentQueries.retrieveProposalList = function(appointmentId) {
  var proposals = [];
  AppointmentEvents.find({
    appointment: appointmentId,
    type: 'proposed'
  }).forEach(function(prop) {
    var vote = AppointmentEvents.find({
      $and: [{
        date: prop.date,
        account: Meteor.userId()
      }, {
        $or: [{
          type: 'accepted'
        }, {
          type: 'rejected'
        }]
      }]
    }, {
      sort: {
        createdAt: -1
      },
      limit: 1
    }).fetch();
    if (vote.length > 0) {
      proposals.push({
        date: prop.date,
        vote: vote[0].type
      });
    } else {
      proposals.push({
        _id: vote._id,
        date: prop.date,
        vote: 'notVoted'
      });
    }
  });
  return proposals;
};
