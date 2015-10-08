AppointmentDetails = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    invitedMembers: React.PropTypes.array.isRequired
  },
  render() {

      return (
        <div className="page appointment-details">

          <AppointmentSettings
            appointment={this.props.appointment}
            />

          <AppointmentMembers
            invitedMembers={this.props.invitedMembers}
            appointment={this.props.appointment}
            />

        </div>
      );
  }
});