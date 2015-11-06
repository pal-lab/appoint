/*jshint esnext: true */

const {
  Navigation,
  State
} = ReactRouter;

AppointmentDetails = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    invitedMembers: React.PropTypes.array.isRequired,
    scheduledEvent: React.PropTypes.object,
  },

  getInitialState() {
    return {
      currentUser: Meteor.user()
    };
  },

  acceptAppointment(){
    Meteor.call('appointment/approve', this.props.appointment._id);
  },

  declineAppointment(){
    Meteor.call('appointment/decline', this.props.appointment._id);
  },

  hasAcknowledged() {
    return Meteor.appointmentQueries.hasAcknowledgment(this.props.appointment._id);
  },

  isOwnAppointment() {
    return (this.state.currentUser._id === this.props.appointment.initiator);
  },

  getEventsInRange() {
    if (Meteor.isCordova) {
        var cal = window.plugins.calendar;
        var earliest = new Date(this.props.appointment.earliest);
        var latest = new Date(this.props.appointment.latest);

        var success = function(message) {
          console.log(message);
          //alert("Success: " + JSON.stringify(message))
          return message;
        };
        var error = function(message) {
          alert("Error: " + message)
          return [];
        };
        cal.listEventsInRange(earliest, latest, success, error);
  } else {
      alert("Still using a browser " + Meteor.user().profile.firstname + "? Start using the app and  I will print your dates!");
      return [];
  }
},

addAppointToCal() {
  if (Meteor.isCordova) {
      var cal = window.plugins.calendar;
      var title = "New Years party";
      var location = "The Club";
      var notes = "Bring pizza.";
      var earliest = new Date(this.props.appointment.earliest);
      var latest = new Date(this.props.appointment.latest);
      var calendarName = "MyCal";

      var success = function(message) {
        console.log(message);
        alert("Success: " + JSON.stringify(message))
      };
      var error = function(message) {
        alert("Error: " + message)
      };
      cal.createEvent(title,location,notes,earliest,latest,success,error);
} else {
    alert("Still using a browser " + Meteor.user().profile.firstname + "? Start using the app and  I will save your dates!");
}
},

  render() {
      //DEBUG
      let debugElements = null;
      debugElements = (
        <div style={{width: '100%', textAlign: 'center'}}>
          <button onClick={ this.getEventsInRange } className="btn btn-primary">Debug: Print my Calendar<span className="icon-check"></span></button>
          <br/>
        </div>
      );
      //DEBUG-END
      let answerInvitationButtons = null;
      if(!this.hasAcknowledged() && !this.isOwnAppointment()) {
        answerInvitationButtons = (
          <div style={{width: '100%', textAlign: 'center'}}>
            <button onClick={ this.acceptAppointment } className="btn btn-primary">Einladung annehmen <span className="icon-check"></span></button>
            <br/>
            <button onClick={ this.declineAppointment } className="btn btn-info">Einladung ablehnen <span className="icon-cross"></span></button>
            <br/><br/>
          </div>
        );
      };

      let renderObject = (
        <div className="page appointment-details">
          <AppointmentTabBar
            appointment = { this.props.appointment }
            />
        { this.props.scheduledEvent
                ? <AppointmentSettings
                  appointment = { this.props.appointment }
                  scheduledEvent = { this.props.scheduledEvent }
                  />
                  : <AppointmentSettings
                    appointment = { this.props.appointment }
                    /> }
          { debugElements }
          { answerInvitationButtons }

          <AppointmentMembers
            invitedMembers = { this.props.invitedMembers }
            appointment = { this.props.appointment }
            />
        </div>
      );

      return renderObject;
  }
});
