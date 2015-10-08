AddMemberList = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          key = { member._id}
          userId = { member._id }
          firstname = { member.profile.firstname }
          lastname = { member.profile.lastname} />
      );
    });

    return (
      <div>
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});