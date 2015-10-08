Appointments = new Mongo.Collection('appointment');

Meteor.methods({
  'appointment/create': function(appointment, invitees) {
    var apDocument = {};
    var user = Meteor.userId();

    if (!user) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    if(invitees === undefined ||invitees === null || invitees.length <= 0) {
      throw new Meteor.Error("no invitees");
      return false;
    }

    apDocument.earliest = moment(appointment.earliest);
    if(!apDocument.earliest.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }
    apDocument.earliest = apDocument.earliest.toDate();

    apDocument.latest = moment(appointment.latest);
    if(!apDocument.latest.isValid()) {
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

    return Appointments.insert(apDocument);
  },
  'appointment/approve': function(id) {
    return true;
  },
  'appointment/decline': function(id) {
    return true;
  },
  'appointment/accept': function(timeStamps) {
    return false;
  }
});
