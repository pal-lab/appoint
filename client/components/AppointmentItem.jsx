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

  openAppointment() {
    this.transitionTo('appointmentpage', {appointment_id: this.props.appointment._id});
  },


  render() {
    let className = "list-item";

    return (
      <div className="row appointment-item" onClick={ this.openAppointment }>
        <div className="col-md-4">
          <h4>{ this.props.appointment.purpose }</h4>
        </div>
        <div className="col-md-8 col-full-height">
          <p><span className="appointment-label">Location:</span> { this.props.appointment.location } </p>
          <p><span className="appointment-label">Duration:</span> { this.props.appointment.duration } minutes </p>
          <p><span className="appointment-label">Status:</span> { this.props.appointment.status } </p>
        </div>
      </div>
    );
  }
});
