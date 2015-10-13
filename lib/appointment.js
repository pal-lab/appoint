/**
 * CRUD for Appointments
 * Appointment Administration Functions
 */
Meteor.methods({
  'appointment/delete': function(apId) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(apId) || !Meteor.validateAppointments.status(apId, 'draft') || !Meteor.validateAppointments.owner(apId)) {
      return false;
    }

    Appointments.remove({
      _id: apId,
    });
  },
  'appointment/update': function(appointment, changes) {
    if (!Meteor.validateAppointments.loggedIn() || !Meteor.validateAppointments.exists(appointment) || !Meteor.validateAppointments.status(appointment, 'draft')) {
      return false;
    }

    var apDocument = {};

    if (changes.earliest) {
      apDocument.earliest = moment(changes.earliest);
      if (!apDocument.earliest.isValid()) {
        throw new Meteor.Error("invalid dateformat");
        return false;
      }
    }

    if (changes.latest) {
      apDocument.latest = moment(changes.latest);
      if (!apDocument.latest.isValid()) {
        throw new Meteor.Error("invalid dateformat");
        return false;
      }
    }

    apDocument.duration = +changes.duration;
    if (apDocument.duration > (60 * 8)) {
      throw new Meteor.Error("maximum duration: 8hrs");
      return false;
    }

    if (apDocument.earliest && apDocument.latest) {
      if (apDocument.earliest.diff(apDocument.latest, 'minutes') > (apDocument.duration) * 1.5) {
        throw new Meteor.Error("difference between earliest and latest too small: " + apDocument.earliest.diff(apDocument.latest, 'minutes'));
        return false;
      }
    }

    if (apDocument.earliest) {
      apDocument.earliest = apDocument.earliest.toDate();
    }
    if (apDocument.latest) {
      apDocument.latest = apDocument.latest.toDate();
    }


    apDocument.purpose = changes.purpose;
    apDocument.location = changes.location;


    var update = Appointments.update(appointment, {
      $set: apDocument
    });
    return update;
  },
  'appointment/create': function() {
    if (!Meteor.validateAppointments.loggedIn()) {
      return false;
    }

    return Appointments.insert({
      purpose: 'New Appointment ' + moment().format('DD.MM.YYYY HH:mm'),
      initiator: Meteor.userId(),
      status: 'draft',
      earliest: moment().toDate(),
      latest: moment().add(1, 'day').toDate(),
      duration: 30
    }, function(err, doc) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $push: {
          'profile.invitations': doc
        }
      }, function(err, doc) {
        if (err) {
          console.log(err);
        }
      });
    });

  }
});
