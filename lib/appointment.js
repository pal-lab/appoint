Appointments = new Mongo.Collection('appointment');
AppointmentEvents = new Mongo.Collection('appointmentevent');


Meteor.methods({
  'appointment/update': function(appointment, changes) {
   // @TODO: - Check whether invitees are valid.
    //        - Check whether duration is plausible

    var apDocument = {};

    apDocument.earliest = moment(changes.earliest);
    if (!apDocument.earliest.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }
    apDocument.earliest = apDocument.earliest.toDate();

    apDocument.latest = moment(changes.latest);
    if (!apDocument.latest.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }
    apDocument.latest = apDocument.latest.toDate();

    apDocument.purpose = changes.purpose;
    apDocument.location = changes.location;
    apDocument.duration = +changes.duration;


    var update = Appointments.update(appointment, {
      $set: apDocument
    });
    return update;
  },
  'appointment/create': function() {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    var id =Appointments.insert({
      purpose: 'New Appointment '+moment().format('DD.MM.YYYY HH:mm'),
      createdAt: new Date(),
      initiator: Meteor.userId()
    });

    return id;
  },
  'appointment/invite': function(id) {
      // @TODO: CHECK WHETHER USER IS INIATOR
      AppointmentEvents.insert({
        type: 'pending',
        account: Meteor.userId(),
        appointment: id
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
