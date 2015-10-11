Meteor.validateAppointments = {};

/**
 * Validation Functions
 */
Meteor.validateAppointments.loggedIn = function() {
  if (!Meteor.userId()) {
    throw new Meteor.Error("you need to be logged in");
    return false;
  }
  return true;
};
Meteor.validateAppointments.exists = function(apId) {
  var res = Appointments.findOne(apId);
  if (!res) {
    throw new Meteor.Error("invalid appointment id", apId);
    return false;
  }
  return true;
};

Meteor.validateAppointments.owner = function(appointmentId) {
  var appointment = Appointments.findOne(appointmentId);
  if (appointment.initiator !== Meteor.userId()) {
    throw new Meteor.Error("you need to own the appointment to do that");
    return false;
  }
  return true;
};

Meteor.validateAppointments.status = function(appointmentId, status) {
  var appointment = Appointments.findOne(appointmentId);
  if (appointment.status != status) {
    throw new Meteor.Error("appointment needs to be in '" + status + "' state");
    return false;
  }
  return true;
};
