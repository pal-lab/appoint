/**
 * Event Sourcing
 */

var evaluateAppointment = function(appointmentId) {
  check(appointmentId, String);

  var self = this;

  var appointment = Appointments.findOne(appointmentId);

  self.checkStatus = function() {

    var CheckStatus = {};

    CheckStatus.checkInvited = function() {
      var cursor = AppointmentEvents.find({
        appointment: appointmentId,
        type: 'invited'
      });
      var events = cursor.count();
      console.log(events);

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
      console.log(es, is);

      return es <= is;
    };

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


    if (CheckStatus.checkPending()) {
      return 'pending';
    }

    if (CheckStatus.checkInvited()) {
      return 'invited';
    }

  };

  self.setPending = function() {

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

    evaluateAppointment(appointmentId).checkStatus();
  }
});
