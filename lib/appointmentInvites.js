/**
 * STATE: draft
 * Appointment add and remove invitees
 */
Meteor.methods({
  'appointment/invite': function(appointmentId) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(appointmentId) || !Meteor.validateAppointments.status(appointmentId, 'draft') || !Meteor.validateAppointments.owner(appointmentId)) {
      return false;
    }

    var appointment = Appointments.findOne(appointmentId);
    var latest = moment(appointment.latest);
    var earliest = moment(appointment.earliest);
    if (!earliest.isBefore(latest)) {
      throw new Meteor.Error("earliest.isBefore(latest) failed!");
      return false;
    }

    var invitedUsers = Meteor.users.find({
      'profile.invitations': {
        $in: [appointmentId]
      }
    }, {
      emails: 1,
      profile: 1
    }).count();
    if (invitedUsers <= 1) {
      throw new Meteor.Error("invite some friendz plxxxx");
      return false;
    }

    AppointmentEvents.insert({
      type: 'invited',
      account: Meteor.userId(),
      appointment: appointmentId
    });
  },
  'appointment/addinvitee': function(apId, addUserId) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(apId) || !Meteor.validateAppointments.status(apId, 'draft')) {
      return false;
    }

    Meteor.users.update({
      _id: addUserId
    }, {
      $push: {
        'profile.invitations': apId
      }
    }, function(err) {
      if (err) {
        console.log(err);
      }
      Appointments.update({
        _id: apId
      }, {
        $set: {
          updatedAt: new Date()
        }
      });
      Meteor.call('appointment/setstatus', apId);
    });
  },
  'appointment/removeinvitee': function(apId, userId) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(apId) || !Meteor.validateAppointments.status(apId, 'draft')) {
      return false;
    }

    var res = Appointments.findOne(apId);
    if (userId === res.initiator) {
      throw new Meteor.Error("cannot remove the initiator");
      return false;
    }

    Meteor.users.update({
      _id: userId
    }, {
      $pull: {
        'profile.invitations': apId
      }
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
    Meteor.call('appointment/setstatus', apId);

  }
});
