const Link = ReactRouter.Link;

AppointmentMembers = React.createClass({
  propTypes: {
    invitedMembers: React.PropTypes.array.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  render() {
    let className = "appointment-members";

    var allMembers = this.props.invitedMembers.map((member) => {
      return (
        <MemberItem
          key = { member._id}
          firstname = { member.users.profile.firstname }
          lastname = { member.users.profile.lastname}/>
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allMembers }
        <Link
          to="addMemberPage"
          params={{ appointment_id: this.props.appointment._id }}
        >
        Invite yo friendz</Link>
      </div>
    );
  }
});
