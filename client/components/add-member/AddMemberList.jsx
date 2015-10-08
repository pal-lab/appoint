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
          key = { member.id }
          firstname = { member.firstname }/>
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allMembers }
      </div>
    );
  }
});