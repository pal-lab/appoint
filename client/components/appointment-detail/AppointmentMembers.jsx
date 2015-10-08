AppointmentMembers = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired
  },
 
  render() {
    let className = "appointment-members";

    var allMembers = this.props.members.map((member) => {
      return (
        <MemberItem
          // firstname={ member.firstname }/>
          key = { member._id}
          firstname = { member.users.profile.firstname }
          lastname = { member.users.profile.lastname}/>
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allMembers }
      </div>
    );
  }
});
