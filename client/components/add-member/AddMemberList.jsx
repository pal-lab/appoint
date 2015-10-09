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
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});