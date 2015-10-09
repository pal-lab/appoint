Meteor.methods({
  'appointment/delete': function(apId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    var res = Appointments.findOne(apId);
    if (res.initiator == Meteor.userId()) {

      var apEvents = AppointmentEvents.find({
        appointment: apId
      }).count();

      if (apEvents <= 0) {
        Appointment.remove({
          _id: apId,
        });

      } else {
        throw new Meteor.Error("appointment is already started.");
        return false;
      }


    } else {
      throw new Meteor.Error("not-authorized");
      return false;
    }

  },
  'appointment/update': function(appointment, changes) {
    // @TODO:
    //        - Check whether duration is plausible

    var apDocument = {};

    if (apDocument.earliest) {
      apDocument.earliest = moment(changes.earliest);
      if (!apDocument.earliest.isValid()) {
        throw new Meteor.Error("invalid dateformat");
        return false;
      }
    }

    if (apDocument.latest) {
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
      if (apDocument.earliest.diff(apDocument.latest, 'minutes') > (apDocument.duration) * 2) {
        throw new Meteor.Error("difference between earliest and latest too small: " + apDocument.earliest.diff(apDocument.latest, 'minutes'));
        return false;
      }
      apDocument.earliest = apDocument.earliest.toDate();
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
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }

    var id = Appointments.insert({
      purpose: 'New Appointment ' + moment().format('DD.MM.YYYY HH:mm'),
      initiator: Meteor.userId(),
      status: 'draft'
    });

    return id;
  },
  'appointment/invite': function(appointmentId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
      return false;
    }
    var appointment = Appointments.findOne(appointmentId);
    if (appointment.initiator !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
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
  'appointment/accept': function(timeStamps) {
    // @TODO: Check whether the timeStamps were proposed

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
    return true;
  }
});
