AddMemberItem = React.createClass({
  propTypes: {
    firstname: React.PropTypes.string,
    lastname: React.PropTypes.string,
    userId: React.PropTypes.string
  },

  getInitialState() {
    return {
      isInvited: false
    };
  },

  inviteUser() {
    console.log('Lets invite him: ' + this.props.userId);
    console.log(this.props.userId);
    Meteor.call("appointment/addinvitee", '8W9JdhY2NPkRTcRTJ', this.props.userId);
  },

  uninviteUser(userID) {
    console.log('Fuck him, lets party: ' + userID);
    Meteor.call("appointment/removeinvitee", '8W9JdhY2NPkRTcRTJ', userID);
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