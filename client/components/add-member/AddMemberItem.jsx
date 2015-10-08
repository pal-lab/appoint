AddMemberItem = React.createClass({
  propTypes: {
    firstname: React.PropTypes.string,
    lastname: React.PropTypes.string,
    userId: React.PropTypes.string,
    appointment: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isInvited: false
    };
  },

  inviteUser() {
    console.log('Inviting user with ID: ' + this.props.userId)
    Meteor.call("appointment/addinvitee", this.props.appointment._id, this.props.userId);
  },

  uninviteUser() {
    console.log('Uninviting user with ID: ' + this.props.userId);
    Meteor.call("appointment/removeinvitee", this.props.appointment._id, this.props.userId);
  },

  render() {
    let listItem;
    if(this.state.isInvited) {
      listItem = (
        <div className="list-item member" onClick={ this.inviteUser }>
          <div className="user">
            { this.props.firstname } &nbsp; { this.props.lastname }
          </div>
          <span className="icon-check"></span>
        </div>
      )
    } else {
      listItem = (
        <div className="list-item member">
          <div className="user" onClick={ this.inviteUser }>
            { this.props.firstname } &nbsp; { this.props.lastname }
          </div>
        </div>
      )
    }

    return listItem;
  }
});