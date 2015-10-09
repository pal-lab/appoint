// if the database is empty on server start, create some sample data.

var data = {};

data.events = function(ap, u1, u2, u3, u4, u5) {
  return [{
      type: 'invited',
      appointment: ap,
      account: u1
    }, {
      type: 'approved',
      appointment: ap,
      account: u1
    }, {
      type: 'approved',
      appointment: ap,
      account: u2
    }, {
      type: 'approved',
      appointment: ap,
      account: u3
    }, {
      type: 'declined',
      appointment: ap,
      account: u4
    }, {
      type: 'declined',
      appointment: ap,
      account: u5
    }, {
      date: moment('2015-10-20 10:00').toDate(),
      appointment: ap,
      type: 'proposed'
    }, {
      date: moment('2015-10-21 10:00').toDate(),
      appointment: ap,
      type: 'proposed'
    }, {
      date: moment('2015-10-19 12:00').toDate(),
      appointment: ap,
      type: 'proposed'
    }, {
      date: moment('2015-10-19 14:00').toDate(),
      appointment: ap,
      type: 'proposed'
    }, {
      date: moment('2015-10-19 10:00').toDate(),
      appointment: ap,
      type: 'proposed'
    },
    // u2
    {
      date: moment('2015-10-20 10:00').toDate(),
      appointment: ap,
      account: u2,
      type: 'accepted'
    }, {
      date: moment('2015-10-21 10:00').toDate(),
      appointment: ap,
      account: u2,
      type: 'accepted'
    }, {
      date: moment('2015-10-19 12:00').toDate(),
      appointment: ap,
      account: u2,
      type: 'rejected'
    }, {
      date: moment('2015-10-19 14:00').toDate(),
      appointment: ap,
      account: u2,
      type: 'rejected'
    }, {
      date: moment('2015-10-19 10:00').toDate(),
      appointment: ap,
      account: u2,
      type: 'rejected'
    },
    // u3
    {
      date: moment('2015-10-20 10:00').toDate(),
      appointment: ap,
      account: u3,
      type: 'accepted'
    }, {
      date: moment('2015-10-21 10:00').toDate(),
      appointment: ap,
      account: u3,
      type: 'accepted'
    }, {
      date: moment('2015-10-19 12:00').toDate(),
      appointment: ap,
      account: u3,
      type: 'rejected'
    }, {
      date: moment('2015-10-19 14:00').toDate(),
      appointment: ap,
      account: u3,
      type: 'accepted'
    }, {
      date: moment('2015-10-19 10:00').toDate(),
      appointment: ap,
      account: u3,
      type: 'accepted'
    }
  ];
};


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
    lastname: 'Istrator',
    invitations: []
  }
}, {
  email: 'jk@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Johannes',
    lastname: 'Klumpe',
    invitations: []
  }
}, {
  email: 'pt@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Philipp',
    lastname: 'Terres',
    invitations: []
  }
}, {
  email: 'jp@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Jorrit',
    lastname: 'Posor',
    invitations: []
  }
}, {
  email: 'sr@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Sven',
    lastname: 'Rossmann',
    invitations: []
  }
}, {
  email: 'ga@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Gregor',
    lastname: 'Albrecht',
    invitations: []
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
  AppointmentEvents.remove({});
  Meteor.users.remove({});
  callback();
};

var loadFixtures = function(force) {
  if (Meteor.users.find().count() === 0 || force === true) {
    _.each(data.accounts, function(account, key) {
      data.accounts[key].id = Accounts.createUser(account);
    });
  }
  console.log('Current Users: ' + Meteor.users.find().count());

  if (Appointments.find().count() === 0 || force === true) {
    _.each(data.appointments, function(ap) {
      var apid = Appointments.insert(ap(data.accounts[0].id));
      _.each(data.proposal(apid), function(app) {
        AppointmentProposals.insert(app);
      });
      _.each(data.events(apid, data.accounts[0].id, data.accounts[1].id, data.accounts[2].id, data.accounts[3].id, data.accounts[4].id), function(evnt) {
        evnt.createdAt = new Date;
        AppointmentEvents.insert(evnt);
      });
      _.each([data.accounts[0].id, data.accounts[1].id, data.accounts[2].id, data.accounts[3].id, data.accounts[4].id], function(user) {
        Meteor.users.update({
          _id: user
        }, {
          $push: {
            'profile.invitations': apid
          }
        }, function(err) {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  }
  console.log('Current Appointments: ' + Appointments.find().count());
};


Meteor.methods({
  resetall: function() {
    dropData(loadFixtures);
  },
  loadFixtures: function() {
    loadFixtures(true);
  }
});

Meteor.startup(function() {
  loadFixtures();
});
