/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

AppointmentItem = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      currentUser: Meteor.user()
    };
  },

  navigateToAppointmentPage() {
    this.transitionTo('appointmentpage', {appointment_id: this.props.appointment._id});
  },

  acceptAppointment(){
    Meteor.call('appointment/approve', this.props.appointment._id);
  },

  declineAppointment(){
    Meteor.call('appointment/decline', this.props.appointment._id);
  },

  checkAcknowledged() {
    if (this.state.currentUser._id !== this.props.appointment.initiator && this.props.appointment.status === "invited"){

      let count = AppointmentEvents.find({$and: [{
        account: Meteor.userId()
      }, {
        $or: [{
          type: 'approved'
        }, {
          type: 'declined'
        }]
      }]}).count();

      console.log(this.props.appointment.purpose + " -> Count: " +count);

      if(count>0){
        return true;
      } else{
        return false;
      }
    } else {
      return true;
    }
  },

  render() {
    let earliestDate = moment(this.props.appointment.earliest).format('DD/MM/YYYY');
    let latestDate = moment(this.props.appointment.latest).format('DD/MM/YYYY');
    let isOwnAppointment = (this.state.currentUser._id === this.props.appointment.initiator);

    let answerInvitationButtons = null;
    if(!this.checkAcknowledged() && !isOwnAppointment) {
      answerInvitationButtons = (
        <div>
          <p><span className="appnt-icon icon-check" style={{ padding: '7px', margin: '10px' }}onClick={ this.acceptAppointment }></span></p>
          <p><span className="appnt-icon icon-cross" style={{ padding: '7px', margin: '10px' }}onClick={ this.declineAppointment }></span></p>
        </div>
      );
    };

    let initiatorLabel = null;
    if(this.state.currentUser._id === this.props.appointment.initiator) {
      initiatorLabel = (
        <span className="list-label" style={{ padding: '4px', letterSpacing: '2px' }}>Initiator</span>
      );
    };

    let renderObject;
    renderObject = (
      <div className="row appointment-item" >
        <div className="col-md-4" onClick={ this.navigateToAppointmentPage }>
          <h4>{ this.props.appointment.purpose }</h4><br/>
          { initiatorLabel }
        </div>
        <div className="col-md-6 col-full-height" onClick={ this.navigateToAppointmentPage }>
          <p><span className="appointment-label">Location:</span> { this.props.appointment.location } </p>
          <p><span className="appointment-label">Duration:</span> { this.props.appointment.duration } minutes </p>
          <p><span className="appointment-label">Earliest:</span> { earliestDate } </p>
          <p><span className="appointment-label">Latest:</span> { latestDate } </p>
          <p><span className="appointment-label">Status:</span> { this.props.appointment.status } </p>
        </div>

        <div className="col-md-2 col-full-hight">
          { answerInvitationButtons }
        </div>

      </div>
    );

    return renderObject;
  }
});
