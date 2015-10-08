Appointments = new Mongo.Collection('appointment');

Meteor.methods({
  'appointment/create': function(appointment, invitees) {
    return 11;
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
