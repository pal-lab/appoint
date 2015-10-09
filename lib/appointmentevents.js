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


var DEBUGGING = false;

var AppointmentCtrl = function(appointment) {

  var self = this;
  self.appointmentId = appointment._id;
  self.appointment = appointment;


  /**
   * returns the status of the given Appointment
   * @return {String} Status
   */
  self.checkStatus = function() {

    var CheckStatus = {};

    self.status = null;



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
      if (DEBUGGING) {
        console.log('invited', events);
      }

      return events > 0;
    };

    CheckStatus.checkPending = function() {
      if (DEBUGGING) {
        console.log('pending', totalAnswers, invitedUsers);
      }
      return votedProposals <= 0 && totalAnswers >= invitedUsers;
    };

    CheckStatus.checkVoting = function() {
      if (DEBUGGING) {
        console.log('voting', votedProposals, approved, proposedDates);
      }
      return proposedDates > 0 && votedProposals < (approved * proposedDates);
    };

    CheckStatus.checkVoted = function() {
      if (DEBUGGING) {
        console.log('voted', votedProposals, approved, proposedDates);
      }
      return votedProposals >= (approved * proposedDates) && proposedDates > 0;
    };


    CheckStatus.checkScheduled = function() {
      var cursor = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'scheduled'
      });
      var events = cursor.count();
      if (DEBUGGING) {
        console.log('scheduled', events);
      }
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


  /**
   * set Status
   * @param {String} status is optional, will otherwise be determined by checkStatus
   */
  self.setStatus = function(status) {
    if (!status) {
      status = self.checkStatus();
    }

    if (DEBUGGING) {
      console.log("=> " + status)
    }
    Appointments.update(self.appointment, {
      $set: {
        status: status
      }
    });
  };


  /**
   * supposed to calculate Proposals
   * @return {[type]} [description]
   */
  self.calcProposals = function() {
    if (self.appointment.status !== 'pending') {
      throw new Meteor.Error("not in pending state: " + self.appointment.status);
      return false;
    }
    // if (DEBUGGING) {
    // console.log(moment.duration(self.appointment.duration, 'minutes'));
    // console.log(moment(self.appointment.earliest));
    // console.log(moment(self.appointment.latest));

    console.log(moment.duration(self.appointment.duration, 'minutes').asHours());
    console.log(self.appointment.earliest);
    console.log(self.appointment.latest);

    var duration = self.appointment.duration;
    var earliest = moment(self.appointment.earliest);
    var latest = moment(self.appointment.latest);
    latest.add(1,'days')
    for (var m = earliest; m.isBefore(latest); m.add(duration,'minutes')) {
      console.log(m.format('YYYY-MM-DD HH:mm'));
    }
    // }
  };

  /**
   * add Proposal to the given Appointment
   * @param {date} date add Appointment
   */
  self.addProposal = function(date) {
    AppointmentEvents.insert({
      type: 'proposed',
      appointment: appointmentId,
      date: date
    });
  };


  return self;
};

Meteor.methods({
  'appointment/setstatus': function(appointmentId) {
    appointment = Appointments.findOne(appointmentId);
    AppointmentCtrl(appointment).setStatus();
  },
  'appointment/calcProposals': function(appointmentId) {
    appointment = Appointments.findOne(appointmentId);
    AppointmentCtrl(appointment).calcProposals();
  }
});
