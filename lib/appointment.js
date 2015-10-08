Appointments = new Mongo.Collection('appointment');
AppointmentEvents = new Mongo.Collection('appointmentevent');


Meteor.methods({
  'appointment/create': function(appointment, invitees) {
    // @TODO: - Check whether invitees are valid.
    //        - Check whether duration is plausible

    var apDocument = {};
    var user = Meteor.userId();

    if (!user) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    if (invitees === undefined || invitees === null || invitees.length <= 0) {
      throw new Meteor.Error("no invitees");
      return false;
    }

    apDocument.earliest = moment(appointment.earliest);
    if (!apDocument.earliest.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }
    apDocument.earliest = apDocument.earliest.toDate();

    apDocument.latest = moment(appointment.latest);
    if (!apDocument.latest.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }
    apDocument.latest = apDocument.latest.toDate();

    apDocument.purpose = appointment.purpose;
    apDocument.location = appointment.location;
    apDocument.duration = +appointment.duration;
    apDocument.initiator = user;


    apDocument.invitees = invitees;
    apDocument.invitees.push(user);

    Appointments.insert(apDocument, function(err, ap) {
      AppointmentEvents.insert({
        type: 'created',
        account: user,
        appointment: ap._id
      });
    });

  },
  'appointment/approve': function(id) {
    // @TODO: Check whether id is a valid appointment

    AppointmentEvents.insert({
      type: 'approved',
      account: Meteor.userId(),
      appointment: id
    });
    return true;
  },
  'appointment/decline': function(id) {
    // @TODO: Check whether id is a valid appointment

    AppointmentEvents.insert({
      type: 'declined',
      account: Meteor.userId(),
      appointment: id
    });
    return true;
  },
  'appointment/accept': function(timeStamps) {
    // @TODO: Check whether the timeStamps were proposed

    AppointmentEvents.find({'type': 'proposed'},function(err,results){
      console.log(results);
    });

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
    return true;
  }
});
