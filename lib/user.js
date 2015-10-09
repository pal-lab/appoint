Meteor.methods({
  'user/changenames': function(firstname, lastname) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }
Meteor.users.update(
   { _id: Meteor.userId()},
   { $set:
    {
      'profile.firstname': firstname, 'profile.lastname': lastname
    }
   }
)
  }
});
