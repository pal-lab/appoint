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

  render() {
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
