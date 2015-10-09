Meteor.methods({
  'appointment/addinvitee': function(apId, addUserId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }
    var res = Appointments.findOne(apId);
    if (res) {
      if (res.initiator == Meteor.userId()) {
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
      } else {
        throw new Meteor.Error("not-authorized");
        return false;
      }
    } else {
      throw new Meteor.Error("invalid appointmentId: <" + apId + ">");
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
