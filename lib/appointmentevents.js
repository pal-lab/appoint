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
      var eventcursor = AppointmentEvents.find({
        $and: [{
          appointment: appointmentId
        }, {
          $or: [{
            type: 'approved'
          }, {
            type: 'declined'
          }]
        }]
      });

      var inviteecursor = AppointmentInvitees.find({
        appointment: appointmentId
      });

      var es = eventcursor.count();
      var is = inviteecursor.count();
      console.log('pending', es, is);

      return es >= is;
    };


    CheckStatus.checkVoted = function() {
      var approved = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'approved'
      }).count();
      var proposed = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'proposed'
      }).count();


      var voted = AppointmentEvents.find({
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

      console.log('voted', voted, approved, proposed);

      return voted >= (approved * proposed);
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
      self.status = 'scheduled'
      return self.status;
    }

    if (CheckStatus.checkVoted()) {
      self.status = 'voted';
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
    if(!status) {
      status = self.checkStatus();
    }

    Appointments.update(appointment, {
      $set: {status: status}
    });
  };


  self.calcProposals = function() {

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
