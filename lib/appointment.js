/**
 * Validation Functions
 */
var validate = function() {
  if (!Meteor.userId()) {
    throw new Meteor.Error("you need to be logged in");
    return false;
  }
  return true;
};

var validateOwner = function(appointmentId) {
  var appointment = Appointments.findOne(appointmentId);
  if (appointment.initiator !== Meteor.userId()) {
    throw new Meteor.Error("you need to own the appointment to do that");
    return false;
  }
  return true;
};

var validateStatus = function(appointmentId, status) {
  var appointment = Appointments.findOne(appointmentId);
  if (appointment.status != status) {
    throw new Meteor.Error("appointment needs to be in '"+status+"' state");
    return false;
  }
  return true;
};

/**
 * Appointment Administration Functions
 */
Meteor.methods({
  'appointment/delete': function(apId) {
    if (!validate() || !validateStatus(apId, 'draft') || !validateOwner(apId)) {
      return false;
    }

    Appointment.remove({
      _id: apId,
    });
  },
  'appointment/update': function(appointment, changes) {
    // @TODO: Check whether duration is plausible

    if (!validate() || !validateStatus(appointment, 'draft')) {
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
    if (!validate()) {
      return false;
    }

    return Appointments.insert({
      purpose: 'New Appointment ' + moment().format('DD.MM.YYYY HH:mm'),
      initiator: Meteor.userId(),
      status: 'draft'
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

  },
  'appointment/invite': function(appointmentId) {
    if (!validate() || !validateStatus(appointmentId, 'draft') || !validateOwner(appointmentId)) {
      return false;
    }

    // @TODO: validate timeframe
    // var diff = moment(appointment.earliest).diff(moment(appointment.latest), 'minutes');
    // if (diff > (appointment.duration) * 2) {
    //   throw new Meteor.Error("difference between earliest and latest too small: " + diff);
    //   return false;
    // }

    AppointmentEvents.insert({
      type: 'invited',
      account: Meteor.userId(),
      appointment: appointmentId
    });
  },
  'appointment/approve': function(id) {
    // @TODO: Check whether id is a valid appointment

    if (!validate() || !validateStatus(id, 'invited')) {
      return false;
    }

    if (AppointmentEvents.find({
        $and: [{
          account: Meteor.userId()
        }, {
          $or: [{
            type: 'approved'
          }, {
            type: 'declined'
          }]
        }]
      }).count() <= 0) {
      AppointmentEvents.insert({
        type: 'approved',
        account: Meteor.userId(),
        appointment: id
      });
      return true;
    } else {
      throw new Meteor.Error("already acknowledge");
      return false;
    }
  },
  'appointment/decline': function(id) {
    // @TODO: Check whether id is a valid appointment

    if (!validate() || !validateStatus(id, 'invited')) {
      return false;
    }

    if (AppointmentEvents.find({
        $and: [{
          account: Meteor.userId()
        }, {
          $or: [{
            type: 'approved'
          }, {
            type: 'declined'
          }]
        }]
      }).count() <= 0) {
      AppointmentEvents.insert({
        type: 'declined',
        account: Meteor.userId(),
        appointment: id
      });
      return true;
    } else {
      throw new Meteor.Error("already acknowledge");
      return false;
    }
  },
  'appointment/accept': function(aId, timeStamp) {
    // @TODO: - Check whether the timeStamps were proposed
    //        - Check if user is invitee


    if (!validate() || !validateStatus(aId, 'voting')) {
      return false;
    }


    var ftstp = moment(timeStamp);
    if (!ftstp.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }

    return AppointmentEvents.insert({
      date: ftstp.toDate(),
      type: 'accepted',
      account: Meteor.userId(),
      appointment: aId
    });

    // AppointmentEvents.find({
    //   'type': 'proposed'
    // }, function(err, results) {
    //   console.log(results);
    // });

    // _.each(timeStamps, function(tstp) {
    //   var ftstp = moment(ftstp);
    //   if (!ftstp.isValid()) {
    //     throw new Meteor.Error("invalid dateformat");
    //     return false;
    //   }

    //   AppointmentEvents.insert({
    //     date: ftstp.toDate(),
    //     type: 'accept',
    //     account: Meteor.userId(),
    //     appointment: id
    //   });

    // });
    // return true;
  },
  'appointment/reject': function(aId, timeStamp) {
    // @TODO: Check whether the timeStamps were proposed

    if (!validate() || !validateStatus(aId, 'voting')) {
      return false;
    }

    var ftstp = moment(timeStamp);
    if (!ftstp.isValid()) {
      throw new Meteor.Error("invalid dateformat");
      return false;
    }

    return AppointmentEvents.insert({
      date: ftstp.toDate(),
      type: 'rejected',
      account: Meteor.userId(),
      appointment: aId
    });
  }
});
