AddMemberItem = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isInvited: false
    };
  },

  inviteUser() {
    console.log('Inviting user with ID: ' + this.props.member._id)
    Meteor.call("appointment/addinvitee", this.props.appointment._id, this.props.member._id);
  },

  uninviteUser() {
    console.log('Uninviting user with ID: ' + this.props.member._id);
    Meteor.call("appointment/removeinvitee", this.props.appointment._id, this.props.member._id);
  },

  render() {
    const memberName = (
      <div className="user">
        { this.props.member.profile.firstname } { this.props.member.profile.lastname }
      </div>
    )

    const itemStyle = {
      paddingLeft: '20px',
      lineHeight: '48px',
      cursor: 'pointer'
    }

    const iconStyle = {
      marginRight: '20px',
      lineHeight: '48px'
    }

    let listItem;
    if(this.state.isInvited) {
      listItem = (
        <div className="list-item member" style={itemStyle} onClick={ this.uninviteUser }>
          <span className="icon-check" style={iconStyle}></span>
          { memberName }
        </div>
      )
    } else {
      listItem = (
        <div className="list-item member" style={itemStyle} onClick={ this.inviteUser }>
          <span className="icon-cross" style={iconStyle}></span>
          { memberName }
        </div>
      )
    }

    return listItem;
  }
});