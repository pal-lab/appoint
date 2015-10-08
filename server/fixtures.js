// if the database is empty on server start, create some sample data.

var data = {};

data.proposal = function(ap) {
  return [{
    date: moment('2015-10-20 10:00').toDate(),
    appointment: ap,
    accepted: 2,
    declined: 1
  }, {
    date: moment('2015-10-21 10:00').toDate(),
    appointment: ap,
    accepted: 0,
    declined: 1
  }, {
    date: moment('2015-10-19 12:00').toDate(),
    appointment: ap,
    accepted: 2,
    declined: 1
  }, {
    date: moment('2015-10-19 14:00').toDate(),
    appointment: ap,
    accepted: 2,
    declined: 1
  }, {
    date: moment('2015-10-19 10:00').toDate(),
    appointment: ap,
    accepted: 2,
    declined: 1
  }];
};

data.accounts = [{
  email: 'admin@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Admin',
    lastname: 'Istrator'
  }
}, {
  email: 'jk@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Johannes',
    lastname: 'Klumpe'
  }
}, {
  email: 'pt@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Philipp',
    lastname: 'Terres'
  }
}, {
  email: 'jp@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Jorrit',
    lastname: 'Posor'
  }
}, {
  email: 'sr@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Sven',
    lastname: 'Rossmann'
  }
}, {
  email: 'ga@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Gregor',
    lastname: 'Albrecht'
  }
}];

data.appointments = [function(initiator) {
  return {
    earliest: moment('2015-10-12').toDate(),
    latest: moment('2015-10-29').toDate(),
    purpose: 'Appoint MVP bauen',
    location: 'Praha',
    duration: moment.duration(4, 'days').asMinutes(),
    initiator: initiator
  };
}, function(initiator) {
  return {
    earliest: moment('2015-10-13').toDate(),
    latest: moment('2015-10-14').toDate(),
    purpose: 'Essen und Trinken',
    location: 'Prag',
    duration: moment.duration(175, 'minutes').asMinutes(),
    initiator: initiator
  };
}, function(initiator) {
  return {
    earliest: moment('2015-10-12').toDate(),
    latest: moment('2015-10-29').toDate(),
    purpose: 'Appoint MVP bauen',
    location: 'Praha',
    duration: moment.duration(4, 'days').asMinutes(),
    initiator: initiator
  };
}];

var dropData = function(callback) {
  Appointments.remove({});
  AppointmentInvitees.remove({});
  Meteor.users.remove({});
  callback();
};

var loadFixtures = function(force) {
  var adminId = null;
  if (Meteor.users.find().count() === 0 || force === true) {
    _.each(data.accounts, function(account) {
      var id = Accounts.createUser(account);
      if (adminId === null) {
        adminId = id
      }
    });
  }
  console.log('Current Users: ' + Meteor.users.find().count());

  if (Appointments.find().count() === 0 || force === true) {
    _.each(data.appointments, function(ap) {
      var apid = Appointments.insert(ap(adminId));
      _.each(data.proposal(apid), function(app) {
        AppointmentProposals.insert(app);
      });
    });
  }
  console.log('Current Appointments: ' + Appointments.find().count());
};


Meteor.methods({
  dropAndLoadFixtures: function() {
    dropData(loadFixtures);
  },
  loadFixtures: function() {
    loadFixtures(true);
  }
});

Meteor.startup(function() {
  loadFixtures();
});
