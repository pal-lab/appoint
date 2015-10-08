// if the database is empty on server start, create some sample data.

var data = {};

data.accountJohannes = {
  email: 'jk@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Johannes',
    lastname: 'Klumpe'
  }
};

data.appointmentApproved = function(id) {
  return {
    earliest: moment('2015-10-12').toDate(),
    latest: moment('2015-10-29').toDate(),
    purpose: 'Appoint MVP bauen',
    location: 'Praha',
    duration: moment.duration(4, 'days').asMinutes(),
    invitees: [{
      status: 'voted',
      account: data.accountJohannes
    }, {
      status: 'voted',
      account: data.accountSven
    }, {
      status: 'voted',
      account: data.accountJorrit
    }, {
      status: 'approved',
      account: data.accountGregor
    }],
    initiator: id,
    status: 'approved'
  };
};

data.appointmentPending = function(id) {
  return {
    earliest: moment('2015-10-13').toDate(),
    latest: moment('2015-10-14').toDate(),
    purpose: 'Essen und Trinken',
    location: 'Prag',
    duration: moment.duration(175, 'minutes').asMinutes(),
    invitees: [{
      status: 'declined',
      account: data.accountJohannes
    }, {
      status: 'approved',
      account: data.accountSven
    }, {
      status: 'approved',
      account: data.accountJorrit
    }, {
      status: 'pending',
      account: data.accountGregor
    }],
    initiator: id,
    status: 'pending'
  };
};


data.appointmentScheduled = function(id) {
  return {
    earliest: moment('2015-10-12').toDate(),
    latest: moment('2015-10-29').toDate(),
    purpose: 'Appoint MVP bauen',
    location: 'Praha',
    duration: moment.duration(4, 'days').asMinutes(),
    initiator: id,
    status: 'approved',
    proposals: [{
      timeStamp: moment('2015-10-13 13:30').toDate(),
      accepted: 2,
      declined: 1
    }, {
      timeStamp: moment('2015-10-14 13:30').toDate(),
      accepted: 0,
      declined: 3
    }, {
      timeStamp: moment('2015-10-15 13:30').toDate(),
      accepted: 0,
      declined: 3
    }, {
      timeStamp: moment('2015-10-16 13:30').toDate(),
      accepted: 0,
      declined: 3
    }, {
      timeStamp: moment('2015-10-17 13:30').toDate(),
      accepted: 3,
      declined: 0
    }]
  };
};



Meteor.startup(function() {
  console.log('load accounts');
  var userid;
  if (Meteor.users.find().count() === 0) {
    userid = Accounts.createUser(data.accountJohannes);
  }
  console.log(Meteor.users.find().count());

  console.log('load appointments');
  if (Appointments.find().count() === 0) {
    Appointments.insert(data.appointmentScheduled(userid));
    Appointments.insert(data.appointmentPending(userid));
    Appointments.insert(data.appointmentApproved(userid));
  }
  console.log(Appointments.find().count());
});
