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

data.accountJorrit = {
  email: 'jp@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Jorrit',
    lastname: 'Posor'
  }
};

data.accountGregor = {
  email: 'ga@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Gregor',
    lastname: 'Albrecht'
  }
};

data.accountSven = {
  email: 'sr@appoint.de',
  password: 'asdasd',
  profile: {
    firstname: 'Sven',
    lastname: 'Rossmann'
  }
};

data.appointmentApproved = {
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
  initiator: data.accountJohannes,
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

data.appointmentPending = {
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
  initiator: data.accountJohannes,
  status: 'pending',
  proposals: []
};


data.appointmentScheduled = {
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
  initiator: data.accountJohannes,
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



Meteor.startup(function() {
  console.log('load accounts');
  if (Meteor.users.find().count() === 0) {
    var acId1 = Accounts.createUser(data.accountJohannes);
    console.log(acId1);
    var acId2 = Accounts.createUser(data.accountSven);
    console.log(acId2);
    var acId3 = Accounts.createUser(data.accountJorrit);
    console.log(acId3);
    var acId4 = Accounts.createUser(data.accountGregor);
    console.log(acId4);
  }
  console.log(Meteor.users.find().count());

  console.log('load appointments');
  if (Appointments.find().count() === 0) {
    Appointments.insert(data.appointmentScheduled);
    Appointments.insert(data.appointmentPending);
    Appointments.insert(data.appointmentApproved);
  }
  console.log(Appointments.find().count());
});
