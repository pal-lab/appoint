/**
 * Event Sourcing
 */
var DEBUGGING = false;
if (Meteor.isServer) {
  var DEBUGGING = false || process.env.debug;
}

var _check = function(a, b) {
  if (typeof a !== b) {
    throw new Meteor.Error("TypeError: " + (typeof a) + " != " + (typeof b));
    return false;
  }
};

Meteor.callbackIterator = function() {
  var cs = [];
  this.add = function(call) {
    cs.push(call);
  };
  this.execute = function() {
    var wrap = function(call, callback) {
      return function() {
        call(callback);
      };
    };
    for (var i = cs.length - 1; i > -1; i--) {
      cs[i] =
        wrap(
          cs[i],
          i < cs.length - 1 ? cs[i + 1] : null);
    }
    cs[0]();
  };
};


var AppointmentCtrl = function(appointment) {
  _check(appointment, 'string');

  var self = this;

  /**
   * returns the status of the given Appointment
   * @return {string} Status
   */
  self.checkStatus = function(rootCallback) {

    var CheckStatus = {};

    self.status = null;

    /**
     * Calculating the stats of the appointment
     * @param  {Function} callback CallbackFunction
     */
    CheckStatus.getStats = function(callback) {
      var cbi = new Meteor.callbackIterator();


      var _scheduleEvent = function(cb) {
        CheckStatus.scheduleEvent = Meteor.appointmentQueries.scheduleEvent(self.appointmentId);
        cb();
      };
      cbi.add(_scheduleEvent);


      var _invitedEvent = function(cb) {
        CheckStatus.invitedEvent = Meteor.appointmentQueries.invitedEvent(self.appointmentId);
        cb();
      };
      cbi.add(_invitedEvent);


      var _approved = function(cb) {
        CheckStatus.approved = Meteor.appointmentQueries.approved(self.appointmentId);
        cb();
      };
      cbi.add(_approved);


      var _proposedDates = function(cb) {
        CheckStatus.proposedDates = Meteor.appointmentQueries.proposedDates(self.appointmentId);
        cb();
      };
      cbi.add(_proposedDates);


      var _votedProposals = function(cb) {
        CheckStatus.votedProposals = Meteor.appointmentQueries.votedProposals(self.appointmentId);
        cb();
      };
      cbi.add(_votedProposals);


      var _totalAnswers = function(cb) {
        CheckStatus.totalAnswers = Meteor.appointmentQueries.totalAnswers(self.appointmentId);
        cb();
      };
      cbi.add(_totalAnswers);


      var _invitedUsers = function(cb) {
        CheckStatus.invitedUsers = Meteor.appointmentQueries.invitedUsers(self.appointmentId);
        cb();
      };
      cbi.add(_invitedUsers);



      var _notVotedProposals = function(cb) {
        CheckStatus.notVotedProposals = Meteor.appointmentQueries.notVotedProposals(self.appointmentId);
        cb();
      };
      cbi.add(_notVotedProposals);

      cbi.add(callback);
      cbi.execute();
    };


    CheckStatus.checkInvited = function() {
      if (DEBUGGING) {
        console.log('invited', CheckStatus.invitedEvent);
      }
      return CheckStatus.invitedEvent > 0;
    };

    CheckStatus.checkPending = function() {
      if (DEBUGGING) {
        console.log('pending', CheckStatus.totalAnswers, CheckStatus.invitedUsers, CheckStatus.votedProposals);
      }
      return CheckStatus.votedProposals <= 0 && CheckStatus.totalAnswers >= CheckStatus.invitedUsers;
    };

    CheckStatus.checkVoting = function() {
      if (DEBUGGING) {
        console.log('voting', CheckStatus.proposedDates, CheckStatus.notVotedProposals);
      }
      return CheckStatus.proposedDates > 0 && CheckStatus.notVotedProposals > 0;
    };

    CheckStatus.checkVoted = function() {
      if (DEBUGGING) {
        console.log('voted', CheckStatus.proposedDates, CheckStatus.notVotedProposals);
      }
      return CheckStatus.proposedDates > 0 && CheckStatus.notVotedProposals <= 0;
    };

    CheckStatus.checkScheduled = function() {
      if (DEBUGGING) {
        console.log('scheduled', CheckStatus.scheduleEvent);
      }
      return CheckStatus.scheduleEvent > 0;
    };

    CheckStatus.DoIt = function() {
      if (CheckStatus.checkScheduled()) {
        self.status = 'scheduled';
        return self.status;
      }

      if (CheckStatus.checkVoted()) {
        self.status = 'voted';
        return self.status;
      }

      if (CheckStatus.checkVoting()) {
        self.status = 'voting';
        return self.status;
      }

      if (CheckStatus.checkPending()) {
        self.status = 'pending';
        return self.status;
      }

      if (CheckStatus.checkInvited()) {
        self.status = 'invited';
        return self.status;
      }

      self.status = 'draft';
      return self.status;
    };

    CheckStatus.getStats(function() {
      if (rootCallback != null) {
        rootCallback(CheckStatus.DoIt());
      } else {
        CheckStatus.DoIt()
      }
    });
  };


  /**
   * set Status
   * @param {string} status is optional, will otherwise be determined by checkStatus
   */
  self.setStatus = function(status, callback) {
    var __set = function(status) {
      _check(status, 'string');

      if (DEBUGGING) {
        console.log("=> " + status);
      }
      Appointments.update(self.appointment, {
        $set: {
          status: status
        }
      }, function(err, doc) {
        self.loadAppointment(null, function() {
          if (self.status == 'pending') {
            self.calcProposals(function() {
              self.setStatus(null, callback);
            });

          } else if (self.status == 'voted') {
            self.scheduleEvent(function() {
              self.setStatus(null, callback);
            });
          } else {
            if (callback != null) {
              callback();
            } else {
              if (DEBUGGING) {
                console.log('status set', self.status);
              }
            }
          }
        });

      });
    }


    if (!status) {
      self.checkStatus(function(stat) {
        __set(stat);
      });
    } else {
      __set(status);
    }
  };

  /**
   * loads an appointment with the given id
   * @param  {string}   id appointment Id
   * @param  {Function} callback Callback
   * @return {[type]}      null
   */
  self.loadAppointment = function(id, callback) {
    id = id || self.appointmentId;
    _check(id, 'string');
    self.appointment = Appointments.findOne(id);
    self.status = self.appointment.status;
    self.appointmentId = self.appointment._id;
    if (callback != null) {
      callback();
    }
  };


  /**
   * add Proposal to the given Appointment
   * @param {date} date add Appointment
   */
  self.addProposal = function(date, callback) {
    _check(date, 'object');
    AppointmentEvents.insert({
      type: 'proposed',
      appointment: self.appointmentId,
      date: date
    }, function() {
      if (DEBUGGING) {
        console.log('saved proposal ', date);
      }
      if (callback != null) {
        callback();
      }
    });
  };

  /**
   * calculate which proposal is the best
   * @param  {Function} callback callback function
   * @return {[type]}            [description]
   */
  self.scheduleEvent = function(callback) {
    if (self.appointment.status !== 'voted') {
      throw new Meteor.Error("not in voted state: " + self.appointment.status);
      return false;
    }
    if (DEBUGGING) {
      console.log('Scheduling: ' + self.appointment.purpose);
    }
    var cbi = new Meteor.callbackIterator();

    var results;

    var bestDate = 0;
    var bestDateVal = 0;

    cbi.add(function(cb) {
      results = Meteor.appointmentQueries.retrieveResultList(self.appointmentId);
      if (cb != null) {
        cb();
      }
    });

    cbi.add(function(cb) {
      _.each(results, function(result, date) {
        var val = (result.accepted - result.rejected);
        if (val > bestDateVal || bestDateVal === 0) {
          bestDate = date;
          bestDateVal = val;
        }
      });
      if (cb != null) {
        cb();
      }
    });


    cbi.add(function(callback) {
      AppointmentEvents.insert({
        type: 'scheduled',
        appointment: self.appointmentId,
        date: bestDate
      }, function() {
        if (DEBUGGING) {
          console.log('scheduled on ', bestDate);
        }
        if (callback != null) {
          callback();
        }
      });
    });

    cbi.add(function(cb) {
      console.log('--------------> BEST DATE', bestDate, bestDateVal);
      if (cb != null) {
        cb();
      }
    });

    if (callback != null && cbi.execute()) {
      callback();
    }
  };


  /**
   * supposed to calculate Proposals
   * @return {[type]} [description]
   */
  self.calcProposals = function(callback) {
    if (self.appointment.status !== 'pending') {
      throw new Meteor.Error("not in pending state: " + self.appointment.status);
      return false;
    }
    if (DEBUGGING) {
      console.log('Duration in hours: ' + moment.duration(self.appointment.duration, 'minutes').asHours());
      console.log('earliest: ' + self.appointment.earliest);
      console.log('latest: ' + self.appointment.latest);
    }

    var cbi = new Meteor.callbackIterator();


    var duration = self.appointment.duration;
    var iterator = moment(self.appointment.earliest);
    var latest = moment(self.appointment.latest);
    latest.add(1, 'days')
    for (var iterate = iterator; iterate.isBefore(latest); iterate.add(duration, 'minutes') && iterate.add(90, 'minutes')) {
      if (DEBUGGING) {
        console.log('propose: ' + iterate.toDate(), 'appoint:', self.appointment.purpose);
      }

      // Apparently this is necessary -.-
      (function(_time) {
        cbi.add(function(cb) {
          self.addProposal(moment(_time).toDate(), cb);
        });
      })(iterate.toString());
    }

    if (callback != null && cbi.execute()) {
      callback();
    }
  };


  /**
   * init function
   * @param  {Integer} appointment Appointment Id
   */
  (function() {
    if (DEBUGGING) {
      console.log('appointment', self.appointment.purpose);
    }
  })(self.loadAppointment(appointment));


  return self;
};

Meteor.methods({
  'appointment/setstatus': function(aId) {
    _check(aId, 'string');
    AppointmentCtrl(aId).setStatus();
  },
  'appointment/calcProposals': function(aId) {
    _check(aId, 'string');
    AppointmentCtrl(aId._id).calcProposals();
  }
});
