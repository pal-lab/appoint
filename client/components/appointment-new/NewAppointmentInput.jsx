/*jshint esnext: true */
AppointmentDetails = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired
  },
  render() {

      return (
        <div className="page appointment-details">

          <AppointmentSettings
            appointment={this.props.appointment} />

          <AppointmentMembers
            invitees={this.props.appointment.invitees} />

        </div>
      );
  }
});
