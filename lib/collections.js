Appointments = new Mongo.Collection('appointment');
AppointmentEvents = new Mongo.Collection('appointmentevent');
AppointmentProposals = new Mongo.Collection('appointmentproposal');

/**
 * Collection Hooks
 *
 * Trigger for certain collection actions
 */


/**
 * Update status of the Appointment where a new AppointmentEvent has been added
 * @param  {string} userId user
 * @param  {doc} doc created AppointmentEvent
 */
AppointmentEvents.after.insert(function(userId, doc) {
  Meteor.call('appointment/setstatus', doc.appointment);
});


// CreatedAt and ModifiedAt Attributes
var CreatedAt = function (userId, doc) {
  doc.createdAt = new Date();
};
var ModifiedAt= function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
};


Appointments.before.insert(CreatedAt);
Appointments.before.update(ModifiedAt);
AppointmentEvents.before.insert(CreatedAt);
