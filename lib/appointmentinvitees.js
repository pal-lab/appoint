Meteor.methods({
  'appointment/addinvitee': function(apId, addUserId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    var res = Appointments.findOne(apId);

    if (addUserId !== Meteor.userId()) {
      if (res) {
        if (res.initiator == Meteor.userId()) {
          var uniqueness = AppointmentInvitees.find({
            appointment: apId,
            user: addUserId
          }).count();

          //TODO: repair if statement
          if (true) {
            var user = Meteor.users.findOne(addUserId);
            user.profile.invitations.push(apId);
            console.log(user);
            Meteor.users.update({_id: addUserId}, {$push: {'profile.invitations': apId}}, function(err) {
                if(err) {
                    console.log(err);
                }
            });
            AppointmentInvitees.insert({
              appointment: apId,
              user: addUserId
            });
          } else {
            console.log('already added');
            return false;
          }
        } else {
          throw new Meteor.Error("not-authorized");
          return false;
        }
      } else {
        throw new Meteor.Error("invalid appointmentId: <" + apId + ">");
        return false;
      }
    } else {
      throw new Meteor.Error("Initiator cant be invited");
      return false;
    }
  },
  'appointment/removeinvitee': function(apId, userId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    var res = Appointments.findOne(apId);
    if (res) {

      if (res.initiator == Meteor.userId()) {
        AppointmentInvitees.remove({
          appointment: apId,
          user: userId
        });

      } else {
        throw new Meteor.Error("not-authorized");
        return false;
      }

    } else {
      throw new Meteor.Error("invalid appointmentId: <" + apId + ">");
      return false;
    }
  }
});
