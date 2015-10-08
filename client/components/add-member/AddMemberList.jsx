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
          userId = { member._id }
          firstname = { member.profile.firstname }
          lastname = { member.profile.lastname }
          appointment = { this.props.appointment }
          />
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