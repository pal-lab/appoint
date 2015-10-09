// if the database is empty on server start, create some sample data.

var data = [];
var accounts = [{
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

// Appoint MVP bauen
// 2/3 voted users
data.push({
  appointment: function(initiator) {
    return {
      earliest: moment('2015-10-12').toDate(),
      latest: moment('2015-10-29').toDate(),
      purpose: 'Appoint MVP bauen',
      location: 'Praha',
      duration: moment.duration(5, 'hours').asMinutes(),
      initiator: initiator
    };
  },
  invitees: [0, 1, 2],

  events: function(ap, u1, u2, u3, u4, u5) {
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
        account: u2
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
  }
});


// Makrelen Party
// supposed to be in voted
data.push({
  appointment: function(initiator) {
    return {
      earliest: moment('2015-10-12').toDate(),
      latest: moment('2015-10-29').toDate(),
      purpose: 'Makrelen Party',
      location: 'Darmstadt',
      duration: moment.duration(8, 'hours').asMinutes(),
      initiator: initiator
    };
  },
  invitees: [0, 1, 2],
  events: function(ap, u1, u2, u3, u4, u5) {
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
      },
      // u1
      {
        date: moment('2015-10-20 10:00').toDate(),
        appointment: ap,
        account: u1,
        type: 'accepted'
      }, {
        date: moment('2015-10-21 10:00').toDate(),
        appointment: ap,
        account: u1,
        type: 'accepted'
      }, {
        date: moment('2015-10-19 12:00').toDate(),
        appointment: ap,
        account: u1,
        type: 'rejected'
      }, {
        date: moment('2015-10-19 14:00').toDate(),
        appointment: ap,
        account: u1,
        type: 'accepted'
      }, {
        date: moment('2015-10-19 10:00').toDate(),
        appointment: ap,
        account: u1,
        type: 'accepted'
      }
    ];
  }
});

// Essen und Trinken
// pending
data.push({
  appointment: function(initiator) {
    return {
      earliest: moment('2015-10-13').toDate(),
      latest: moment('2015-10-14').toDate(),
      purpose: 'Essen und Trinken',
      location: 'Prag',
      duration: moment.duration(175, 'minutes').asMinutes(),
      initiator: initiator
    };
  },
  invitees: [0, 1, 2, 3, 4],

  events: function(ap, u1, u2, u3, u4, u5) {
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
    }];
  }
});

// Appoint Party Planen
// pending
data.push({
  appointment: function(initiator) {
    return {
      earliest: moment('2015-10-12').toDate(),
      latest: moment('2015-10-29').toDate(),
      purpose: 'Appoint Party Planen',
      location: 'Praha',
      duration: moment.duration(4, 'hours').asMinutes(),
      initiator: initiator
    };
  },
  invitees: [0, 1],

  events: function(ap, u1, u2, u3, u4, u5) {
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
    }];
  }
});


// Ich lade euch ein Freunde
// invited
data.push({
  appointment: function(initiator) {
    return {
      earliest: moment('2015-10-12').toDate(),
      latest: moment('2015-10-29').toDate(),
      purpose: 'Ich lade euch ein Freunde',
      location: 'Praha',
      duration: moment.duration(2, 'hours').asMinutes(),
      initiator: initiator
    };
  },
  invitees: [0, 1],

  events: function(ap, u1, u2, u3, u4, u5) {
    return [{
      type: 'invited',
      appointment: ap,
      account: u1
    }];
  }
});


var dropData = function(callback) {
  Appointments.remove({});
  AppointmentEvents.remove({});
  Meteor.users.remove({});
  callback();
};

var loadFixtures = function(force) {
  if (Meteor.users.find().count() === 0 || force === true) {
    _.each(accounts, function(account, key) {
      accounts[key].id = Accounts.createUser(account);
    });
  }
  console.log('Current Users: ' + Meteor.users.find().count());

  if (Appointments.find().count() === 0 || force === true) {
    _.each(data, function(dat) {
      var apid = Appointments.insert(dat.appointment(accounts[0].id));

      // add invitee
      _.each(dat.invitees, function(user) {
        Meteor.users.update({
          _id: accounts[user].id
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

      // add events
      _.each(dat.events(apid, accounts[0].id, accounts[1].id, accounts[2].id, accounts[3].id, accounts[4].id), function(evnt) {
        AppointmentEvents.insert(evnt);
      });

    });
  }
  console.log('Current Appointments: ' + Appointments.find().count());
};


Meteor.methods({
  resetAll: function() {
    dropData(loadFixtures);
  },
  loadFixtures: function() {
    loadFixtures(true);
  }
});

Meteor.startup(function() {
  loadFixtures();
});
