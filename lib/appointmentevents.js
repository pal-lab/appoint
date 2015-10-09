/**
 * Event Sourcing
 */


// var cursor = AppointmentEvents.find({
//   appointment: appointmentId
// }, {
//   sort: {
//     "createdAt": 1
//   }
// });

// console.log(cursor.count());
// cursor.forEach(function(evnt) {
//   console.log(evnt);
// });


var evaluateAppointment = function(appointmentId) {
  check(appointmentId, String);

  var self = this;

  var appointment = Appointments.findOne(appointmentId);


  /**
   * returns the status of the given Appointment
   * @return {String} Status
   */
  self.checkStatus = function() {

    var CheckStatus = {};


    var approved = AppointmentEvents.find({
      appointment: appointmentId,
      type: 'approved'
    }).count();
    var proposedDates = AppointmentEvents.find({
      appointment: appointmentId,
      type: 'proposed'
    }).count();
    var votedProposals = AppointmentEvents.find({
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
    var totalAnswers = AppointmentEvents.find({
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
    var invitedUsers = Meteor.users.find({
      'profile.invitations': {
        $in: [appointmentId]
      }
    }).count();


    CheckStatus.checkInvited = function() {
      var cursor = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'invited'
      });
      var events = cursor.count();
      console.log('invited', events);

      return events > 0;
    };

    CheckStatus.checkPending = function() {
      console.log('pending', totalAnswers, invitedUsers);
      return votedProposals <= 0 && totalAnswers >= invitedUsers;
    };

    CheckStatus.checkVoting = function() {
      console.log('voting', votedProposals, approved, proposedDates);
      return proposedDates > 0 && votedProposals < (approved * proposedDates);
    };

    CheckStatus.checkVoted = function() {
      console.log('voted', votedProposals, approved, proposedDates);
      return votedProposals >= (approved * proposedDates) && proposedDates > 0;
    };


    CheckStatus.checkScheduled = function() {
      var cursor = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'scheduled'
      });
      var events = cursor.count();
      console.log('scheduled', events);
      return events > 0;
    };

    if (CheckStatus.checkScheduled()) {
      self.status = 'scheduled';
      return self.status;
    }

    if (CheckStatus.checkVoted()) {
      self.status = 'voted';
      return self.status;
    }

    if (CheckStatus.checkVoting()) {
      self.status = 'voting';
      return self.status;
    }

    if (CheckStatus.checkPending()) {
      self.status = 'pending';
      return self.status;
    }

    if (CheckStatus.checkInvited()) {
      self.status = 'invited';
      return self.status;
    }

    self.status = 'draft';
    return self.status;
  };


  self.setStatus = function(status) {
    if (!status) {
      status = self.checkStatus();
    }

    Appointments.update(appointment, {
      $set: {
        status: status
      }
    });
  };


  self.calcProposals = function() {
    if (!self.status) {
      self.checkStatus();
    }
    if (self.status !== 'pending') {
      return false;
    }
    console.log(moment.duration(appointment.duration, 'minutes'));
    console.log(moment(appointment.earliest));
    console.log(moment(appointment.latest));
  };

  self.syncProposals = function() {

  };

  self.addProposal = function(date) {

  };

  return self;
};

Meteor.methods({
  'testTest': function(appointmentId) {
    evaluateAppointment(appointmentId).setStatus();
  }
});
