Appointments = new Mongo.Collection('appointment');
AppointmentEvents = new Mongo.Collection('appointmentevent');
AppointmentProposals = new Mongo.Collection('appointmentproposal');




Appointments.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});
Appointments.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
});

AppointmentEvents.after.insert(function(userId, doc) {
  Meteor.call('appointment/setstatus', doc.appointment);
})
AppointmentEvents.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});
