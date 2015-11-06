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

Meteor.appointmentQueries.scheduled = function(appointmentId) {
  return AppointmentEvents.findOne({
    appointment: appointmentId,
    type: 'scheduled'
  });
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




Meteor.appointmentQueries.retrieveResultList = function(appointmentId) {
  var cbi = new Meteor.callbackIterator();

  var stateInvitedUsers = {};
  var result = {};

  cbi.add(function(callback) {
    Meteor.users.find({
      'profile.invitations': {
        $in: [appointmentId]
      }
    }).forEach(function(userObj) {
      stateInvitedUsers[userObj._id] = {};
      AppointmentEvents.find({
        $and: [{
          appointment: appointmentId,
          account: userObj._id,
        }, {
          $or: [{
            type: 'accepted'
          }, {
            type: 'rejected'
          }]
        }]
      }, {
        createdAt: -1
      }).forEach(function(evnt) {
        stateInvitedUsers[userObj._id][evnt.date] = evnt.type;
      });
    });

    if (callback != null) {
      callback();
    }
  });

  cbi.add(function(callback) {
    AppointmentEvents.find({
      appointment: appointmentId,
      type: 'proposed'
    }).forEach(function(prop) {
      var res = {
        'accepted': 0,
        'rejected': 0,
        'notVoted': 0
      };
      _.each(stateInvitedUsers, function(userVote, userId) {
        var state = stateInvitedUsers[userId][prop.date];
        if (state == 'accepted') {
          res.accepted += 1
        } else if (state == 'rejected') {
          res.rejected += 1
        } else {
          res.notVoted += 1
        }
      });

      result[prop.date] = res;
    });
    if (callback != null) {
      callback();
    }
  });

  cbi.execute();
  return result;

};



Meteor.appointmentQueries.notVotedProposals = function(appointmentId) {
  var cbi = new Meteor.callbackIterator();

  var stateInvitedUsers = {};
  var result = 0;

  cbi.add(function(callback) {
    Meteor.users.find({
      'profile.invitations': {
        $in: [appointmentId]
      }
    }).forEach(function(userObj) {
      stateInvitedUsers[userObj._id] = {};
      AppointmentEvents.find({
        $and: [{
          appointment: appointmentId,
          account: userObj._id,
        }, {
          $or: [{
            type: 'accepted'
          }, {
            type: 'rejected'
          }]
        }]
      }, {
        createdAt: -1
      }).forEach(function(evnt) {
        stateInvitedUsers[userObj._id][evnt.date] = evnt.type;
      });
    });

    if (callback != null) {
      callback();
    }
  });

  cbi.add(function(callback) {
    AppointmentEvents.find({
      appointment: appointmentId,
      type: 'proposed'
    }).forEach(function(prop) {
      var notVoted = 0;
      _.each(stateInvitedUsers, function(userVote, userId) {
        if (stateInvitedUsers[userId][prop.date] === undefined) {
          notVoted += 1
        }
      });

      result += notVoted;
    });
    if (callback != null) {
      callback();
    }
  });

  cbi.execute();
  return result;

};
