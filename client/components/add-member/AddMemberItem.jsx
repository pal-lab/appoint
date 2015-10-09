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
        { this.props.member.profile.firstname } { this.props.member.profile.lastname }
      </div>
    )

    let listItem;
    const isUserInvited = (_.indexOf(this.props.member.profile.invitations, this.props.appointment._id) > -1);
    if(isUserInvited) {
      listItem = (
        <div className="appnt-list-item list-item member" onClick={ this.toggleInvite }>
          <span className="appnt-icon icon-plus"></span>
          { memberName }
        </div>
      )
    } else {
      listItem = (
        <div className="appnt-list-item list-item member" onClick={ this.toggleInvite }>
          <span className="appnt-icon icon-cross"></span>
          { memberName }
        </div>
      )
    }

    return listItem;
  }
});