AddMemberList = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      membersBeingInvited: null,
    };
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          // firstname={ member.firstname }/>
          key = { member._id}
          firstname = { member.profile.firstname }
          lastname = { member.profile.lastname}/>
      );
    });

    return (
      <div className="list-items">
        { allMembers }
      </div>
    );
  }
});