Appointments = new Mongo.Collection('appointment');
AppointmentEvents = new Mongo.Collection('appointmentevent');
AppointmentProposals = new Mongo.Collection('appointmentproposal');


AppointmentEvents.after.insert(function(userId, doc) {
  Meteor.call('appointment/setstatus', doc.appointment);
})
