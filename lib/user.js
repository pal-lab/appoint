Meteor.methods({
  'user/changenames': function(firstname, lastname) {
    if (!Meteor.validateAppointments.loggedIn()) {
      return false;
    }

    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        'profile.firstname': firstname,
        'profile.lastname': lastname
      }
    })
  }
});
