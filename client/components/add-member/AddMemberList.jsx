AddMemberList = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      membersBeingInvited: null,
    };
  },

  setTaskBeingEdited(taskId) {
    this.setState({
      taskBeingEditedId: taskId
    });
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          // firstname={ member.firstname }/>
          firstname = 'Emanuela';
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allMembers }
      </div>
    );
  }
});