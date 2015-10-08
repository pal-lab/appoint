// if the database is empty on server start, create some sample data.

var data = {};

data.accountJohannes = {
  firstname: 'Johannes',
  lastname: 'Klumpe'
};

data.accountJorrit = {
  firstname: 'Jorrit',
  lastname: 'Posor'
};

data.accountGregor = {
  firstname: 'Gregor',
  lastname: 'Albrecht'
};

data.accountSven = {
  firstname: 'Sven',
  lastname: 'Rossmann'
};

data.appointmentApproved = {
  earliest: moment('2010-10-12'),
  latest: moment('2015-10-29'),
  purpose: 'Appoint MVP bauen',
  location: 'Praha',
  duration: moment.duration(4, 'days'),
  invitees: [{
    status: 'voted',
    account: accountJohannes
  }, {
    status: 'voted',
    account: accountSven
  }, {
    status: 'voted',
    account: accountJorrit
  }, {
    status: 'approved',
    account: accountGregor
  }],
  initiator: accountJohannes,
  status: 'approved',
  proposals: [{
    timeStamp: moment('2010-10-13 13:30'),
    accepted: 2,
    declined: 1
  }, {
    timeStamp: moment('2010-10-14 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-15 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-16 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-17 13:30'),
    accepted: 3,
    declined: 0
  }]
};

data.appointmentPending = {
  earliest: moment('2010-10-13'),
  latest: moment('2015-10-14'),
  purpose: 'Essen und Trinken',
  location: 'Prag',
  duration: moment.duration(2, 'hours'),
  invitees: [{
    status: 'declined',
    account: accountJohannes
  }, {
    status: 'approved',
    account: accountSven
  }, {
    status: 'approved',
    account: accountJorrit
  }, {
    status: 'pending',
    account: accountGregor
  }],
  initiator: accountJohannes,
  status: 'pending',
  proposals: []
};


data.appointmentScheduled = {
  earliest: moment('2010-10-12'),
  latest: moment('2015-10-29'),
  purpose: 'Appoint MVP bauen',
  location: 'Praha',
  duration: moment.duration(4, 'days'),
  invitees: [{
    status: 'voted',
    account: accountJohannes
  }, {
    status: 'voted',
    account: accountSven
  }, {
    status: 'voted',
    account: accountJorrit
  }, {
    status: 'approved',
    account: accountGregor
  }],
  initiator: accountJohannes,
  status: 'approved',
  proposals: [{
    timeStamp: moment('2010-10-13 13:30'),
    accepted: 2,
    declined: 1
  }, {
    timeStamp: moment('2010-10-14 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-15 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-16 13:30'),
    accepted: 0,
    declined: 3
  }, {
    timeStamp: moment('2010-10-17 13:30'),
    accepted: 3,
    declined: 0
  }]
};



Meteor.startup(function() {
  if (Appointments.find().count() === 0) {

    var apId1 = Appointments.insert(data.appointmentScheduled);
    console.log(apId1);
    apId2 = Appointments.insert(data.appointmentPending);
    console.log(apId2);
    apId3 = Appointments.insert(data.appointmentApproved);
    console.log(apId3);

  }
});
