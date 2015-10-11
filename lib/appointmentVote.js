/**
 * STATE: voting
 * Appointment Vote Functions
 */
Meteor.methods({
  'appointment/accept': function(aId, timeStamp) {
    // @TODO: - Check whether the timeStamps were proposed
    //        - Check if user is invitee


    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(aId) || !Meteor.validateAppointments.status(aId, 'voting')) {
      return false;
    }


    var ftstp = moment(timeStamp);
    if (!ftstp.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }

    return AppointmentEvents.insert({
      date: ftstp.toDate(),
      type: 'accepted',
      account: Meteor.userId(),
      appointment: aId
    });

    // AppointmentEvents.find({
    //   'type': 'proposed'
    // }, function(err, results) {
    //   console.log(results);
    // });

    // _.each(timeStamps, function(tstp) {
    //   var ftstp = moment(ftstp);
    //   if (!ftstp.isValid()) {
    //     throw new Meteor.Error("invalid dateformat");
    //     return false;
    //   }

    //   AppointmentEvents.insert({
    //     date: ftstp.toDate(),
    //     type: 'accept',
    //     account: Meteor.userId(),
    //     appointment: id
    //   });

    // });
    // return true;
  },
  'appointment/reject': function(aId, timeStamp) {
    // @TODO: Check whether the timeStamps were proposed

    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(aId) || !Meteor.validateAppointments.status(aId, 'voting')) {
      return false;
    }

    var ftstp = moment(timeStamp);
    if (!ftstp.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }

    return AppointmentEvents.insert({
      date: ftstp.toDate(),
      type: 'rejected',
      account: Meteor.userId(),
      appointment: aId
    });
  }
});
