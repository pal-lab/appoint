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
