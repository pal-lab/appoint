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
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});
