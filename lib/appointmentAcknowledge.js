/**
 * STATE: invited
 * Appointment Acknowledge Functions
 */
Meteor.methods({
  'appointment/invite': function(appointmentId) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(appointmentId) || !Meteor.validateAppointments.status(appointmentId, 'draft') || !Meteor.validateAppointments.owner(appointmentId)) {
      return false;
    }

    // @TODO: validate timeframe
    // var diff = moment(appointment.earliest).diff(moment(appointment.latest), 'minutes');
    // if (diff > (appointment.duration) * 2) {
    //   throw new Meteor.Error("difference between earliest and latest too small: " + diff);
    //   return false;
    // }

    AppointmentEvents.insert({
      type: 'invited',
      account: Meteor.userId(),
      appointment: appointmentId
    });
  },
  'appointment/approve': function(id) {
    // @TODO: Check whether id is a valid appointment

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
      }).count() <= 0) {
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
    // @TODO: Check whether id is a valid appointment

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
      }).count() <= 0) {
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
