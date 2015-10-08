Appointments = new Mongo.Collection('appointment');
AppointmentInvitees = new Mongo.Collection('appointmentinvitees');
AppointmentEvents = new Mongo.Collection('appointmentevent');

AppointmentInvitees.join(Meteor.users, "user", "users", ['profile']);
AppointmentInvitees.join(Appointments, "appointment", "appointments", ['purpose', 'location', 'duration', 'earliest', 'latest']);
