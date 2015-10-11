/**
 * STATE: invited
 * Appointment Acknowledge Functions
 */
Meteor.methods({
  'appointment/approve': function(id) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(id) || !Meteor.validateAppointments.status(id, 'invited')) {
      return false;
    }

    var hasAcknowledgment = Meteor.appointmentQueries.hasAcknowledgment(id);

    if (!hasAcknowledgment) {
      AppointmentEvents.insert({
        type: 'approved',
        account: Meteor.userId(),
        appointment: id
      });
      return true;
    } else {
      throw new Meteor.Error("already acknowledge");
      return false;
    }
  },
  'appointment/decline': function(id) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(id) || !Meteor.validateAppointments.status(id, 'invited')) {
      return false;
    }

    if (AppointmentEvents.find({
        $and: [{
          account: Meteor.userId()
        }, {
          $or: [{
            type: 'approved'
          }, {
            type: 'declined'
          }]
        }]
      }).count() < 1) {
      AppointmentEvents.insert({
        type: 'declined',
        account: Meteor.userId(),
        appointment: id
      });
      return true;
    } else {
      throw new Meteor.Error("already acknowledge");
      return false;
    }
  }
});
