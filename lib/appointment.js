Appointments = new Mongo.Collection('appointment');

/*
var accountJohannes = {
  firstname: 'Johannes',
  lastname: 'Klumpe'
};

var accountJorrit = {
  firstname: 'Jorrit',
  lastname: 'Posor'
};

var accountGregor = {
  firstname: 'Gregor',
  lastname: 'Albrecht'
};

var accountSven = {
  firstname: 'Sven',
  lastname: 'Rossmann'
};

var dummyAppointmentApproved = {
  earliest: moment('2010-10-12'),
  latest: moment('2015-10-29'),
  purpose: 'Appoint MVP bauen',
  location: 'Praha',
  duration: moment.duration(4, 'days'),
  invitees: [{
    status: 'voted',
    account: accountJohannes
  },{
    status: 'voted',
    account: accountSven
  },{
    status: 'voted',
    account: accountJorrit
  },{
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

var dummyAppointmentPending = {
  earliest: moment('2010-10-13'),
  latest: moment('2015-10-14'),
  purpose: 'Essen und Trinken',
  location: 'Prag',
  duration: moment.duration(2, 'hours'),
  invitees: [{
    status: 'declined',
    account: accountJohannes
  },{
    status: 'approved',
    account: accountSven
  },{
    status: 'approved',
    account: accountJorrit
  },{
    status: 'pending',
    account: accountGregor
  }],
  initiator: accountJohannes,
  status: 'pending',
  proposals: []
};


var dummyAppointmentScheduled = {
  earliest: moment('2010-10-12'),
  latest: moment('2015-10-29'),
  purpose: 'Appoint MVP bauen',
  location: 'Praha',
  duration: moment.duration(4, 'days'),
  invitees: [{
    status: 'voted',
    account: accountJohannes
  },{
    status: 'voted',
    account: accountSven
  },{
    status: 'voted',
    account: accountJorrit
  },{
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

Meteor.methods({
  '/appointment': function(appointment, invitees) {
    // var appointObj = {
    //   name: appointment.name,
    //   createdAt: new Date()
    // };

    // var appointmentId = Appointment.insert(appointObj);

    // return appointmentId;

    return [ dummyAppointment ];
  },
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
  },
  'appointment/info': function(id) {
    return dummyAppointment;
  }
});
*/
