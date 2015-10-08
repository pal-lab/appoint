AddMemberList = React.createClass({
  propTypes: {
    firstname: React.propTypes.string.isRequired,
  },

  // getInitialState() {
  //   return {
  //     membersBeingInvited: null,
  //   };
  // },

  // setMemberAsInvited(memberID) {

  // },

  // setMemberAsNotInvited(memberID) {
  //   index = this.state.membersBeingInvited.indexOf(memberID);
  //   if (index > -1) {
  //     this.st.splice(index, 1);
  //   }
  //   this.setState({
  //     membersBeingInvited.push(memberID);
  //   });

  // },

  render() {
    return (
      <div className="list-item member">
        { this.props.firstname }
      </div>
    );
  }
});