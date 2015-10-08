const Link = ReactRouter.Link;

AppointmentMembers = React.createClass({
  propTypes: {
    invitees: React.PropTypes.object.isRequired
  },

  render() {
    let className = "appointment-members";

    var allMembers = this.props.invitees.map((member) => {
      return (
        <MemberItem
          // firstname={ member.firstname }/>
          key = { member._id}
          firstname = { member.account.profile.firstname }
          lastname = { member.account.profile.lastname}/>
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allMembers }
        <Link
          to="addMemberPage"
          params={{ appointment_id: 'asdasdasdasd' }}
        >
        Invite yo friendz</Link>
      </div>
    );
  }
});
