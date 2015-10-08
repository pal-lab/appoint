AppointmentInvitees = new Mongo.Collection('appointmentinvitees');


Meteor.methods({
  'appointment/addinvitee': function(apId, userId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    Appointments.find({
      _id: apId
    }, function(err, res) {
      if (res.initiator == Meteor.userId()) {

        // @TODO: check whether user was already added!
        AppointmentInvitees.insert({
          appointment: apId,
          user: userId
        });

      } else {
        throw new Meteor.Error("not-authorized");
        return false;
      }
    });
    return id;
  },
  'appointment/rminvitee': function(apId, userId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    Appointments.find({
      _id: apId
    }, function(err, res) {

      if (res.initiator == Meteor.userId()) {
        AppointmentInvitees.remove({
          appointment: apId,
          user: userId
        });

      } else {
        throw new Meteor.Error("not-authorized");
        return false;
      }
    });
  }
});
