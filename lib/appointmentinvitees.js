/**
 * STATE: draft
 * Appointment add and remove invitees
 */
Meteor.methods({
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
