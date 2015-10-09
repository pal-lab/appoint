/*jshint esnext: true */
const Link = ReactRouter.Link;

AddMemberList = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          key = { member._id}
          member = { member }
          appointment = { this.props.appointment }
          />
      );
    });

    return (
      <div>
        <div>
          <Link
            className="btn-primary"
            key={ this.props.appointment._id }
            to="appointmentpage"
            params={{ appointment_id: this.props.appointment._id }}>
              Zurück zu {this.props.appointment.purpose}
          </Link>
        </div>
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});