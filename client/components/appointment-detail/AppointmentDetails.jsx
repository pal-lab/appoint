AppointmentDetails = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    members: React.PropTypes.array.isRequired
  },
  render() {

      return (
        <div className="page appointment-details">

          <AppointmentSettings
            appointment={this.props.appointment}
            />

          <AppointmentMembers
            members={this.props.members}
            appointment={this.props.appointment}
            />

        </div>
      );
  }
});