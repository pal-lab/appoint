/*jshint esnext: true */
const Link = ReactRouter.Link;

AppointmentDetails = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    invitedMembers: React.PropTypes.array.isRequired
  },
  render() {

      return (
        <div className="page appointment-details">
          <ul className="nav nav-pills nav-justified">
            <li>
              <Link
                className="btn-primary"
                key={ this.props.appointment._id }
                to="appointmentpage"
                params={{ appointment_id: this.props.appointment._id }}>
                  Overview
              </Link>
            </li>
            <li>
              <Link
                className="btn-primary"
                key={ this.props.appointment._id }
                to="proposalpage"
                params={{ appointment_id: this.props.appointment._id }}>
                  Proposed Dates
              </Link>
            </li>
            <li>
              <Link
                className="btn-primary"
                key={ this.props.appointment._id }
                to="addMemberPage"
                params={{ appointment_id: this.props.appointment._id }}>
                  Add yo friendz'
              </Link>
            </li>
          </ul>

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
