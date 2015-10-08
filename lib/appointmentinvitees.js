AppointmentInvitees = new Mongo.Collection('appointmentinvitees');


Meteor.methods({
  'appointment/addinvitee': function(apId, userId) {
    // @TODO: check whether user is initiator
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
    })
    var id = Appointments.insert({
      purpose: 'New Appointment ' + moment().format('DD.MM.YYYY HH:mm'),
      createdAt: new Date(),
      initiator: Meteor.userId()
    });

    return id;
  },
  'appointment/rminvitee': function(apId, userId) {
    // @TODO: check whether user is initiator
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    AppointmentInvitees.remove({
      appointment: apId,
      user: userId
    });
  }
});
