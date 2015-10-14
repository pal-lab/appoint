/*jshint esnext: true */

const {
  Navigation,
  State
} = ReactRouter;

AppointmentDetails = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    invitedMembers: React.PropTypes.array.isRequired
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

  listEventsInRange() {
    if (Meteor.isCordova) {
      console.log('DEBUG: Getting all events in Range');
      // Wait for Cordova to load
      document.addEventListener("deviceready", onDeviceReady, false);
      // Cordova is ready
      function onDeviceReady() {
        // prep some variables
        var cal = window.plugins.calendar;
        var title = "New Years party";
        var loc = "The Club";
        var notes = "Bring pizza.";
        var start = new Date(2015, 0, 1, 20, 0, 0, 0, 0); // Jan 1st, 2015 20:00
        var end = new Date(2015, 12, 1, 22, 0, 0, 0, 0); // Jan 1st, 2015 22:00
        var calendarName = "MyCal";

        var success = function(message) {
          console.log(message);
          alert("Success: " + JSON.stringify(message))
        };
        var error = function(message) {
          alert("Error: " + message)
        };
        // create an event silently (on Android < 4 an interactive dialog is shown)
        //window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
        cal.listEventsInRange(start, end, success, error);
        //cal.listCalendars(success, error);
      }
  } else {
      alert("Still using a browser " + Meteor.user().profile.firstname + "? Start using the app and  I will print your dates!");
  }
},

  render() {
      //DEBUG
      let debugElements = null;
      debugElements = (
        <div style={{width: '100%', textAlign: 'center'}}>
          <button onClick={ this.listEventsInRange } className="btn btn-primary">Debug: Print my Calendar<span className="icon-check"></span></button>
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
          <AppointmentSettings
            appointment = { this.props.appointment }
            />
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
