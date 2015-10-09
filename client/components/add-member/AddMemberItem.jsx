AddMemberItem = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  // getInitialState() {
  //   return {
  //     isInvited: false
  //   };
  // },

  toggleInvite() {
    let invited = (_.indexOf(this.props.member.profile.invitations, this.props.appointment._id) > -1);
    console.log('Invited?! ' + invited);
    console.log('Invitation: ' + this.props.member.profile.invitations);

    if(invited) {
      console.log('UNinviting this user: ' + this.props.member._id);
      Meteor.call("appointment/removeinvitee", this.props.appointment._id, this.props.member._id);
    } else {
      console.log('Inviting this user: ' + this.props.member._id);
      Meteor.call("appointment/addinvitee", this.props.appointment._id, this.props.member._id);
    }

    invited = !invited;

  },

  // inviteUser() {
  //   console.log('Inviting user with ID: ' + this.props.member._id)
  //   Meteor.call("appointment/addinvitee", this.props.appointment._id, this.props.member._id);
  // },

  // uninviteUser() {
  //   console.log('Uninviting user with ID: ' + this.props.member._id);
  //   Meteor.call("appointment/removeinvitee", this.props.appointment._id, this.props.member._id);
  // },

  render() {
    const memberName = (
      <div className="user">
        { this.props.member.profile.firstname } { this.props.member.profile.lastname } -> { this.props.member.profile.invitations }
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
    const isUserInvited = (_.indexOf(this.props.member.profile.invitations, this.props.appointment._id) > -1);
    if(isUserInvited) {
      listItem = (
        <div className="list-item member" style={itemStyle} onClick={ this.toggleInvite }>
          <span className="icon-plus" style={iconStyle}></span>
          { memberName }
        </div>
      )
    } else {
      listItem = (
        <div className="list-item member" style={itemStyle} onClick={ this.toggleInvite }>
          <span className="icon-cross" style={iconStyle}></span>
          { memberName }
        </div>
      )
    }

    return listItem;
  }
});