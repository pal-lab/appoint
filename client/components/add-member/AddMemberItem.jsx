/*jshint esnext: true */
AddMemberItem = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  toggleInvite() {
    let invited = (_.indexOf(this.props.member.profile.invitations, this.props.appointment._id) > -1);

    if(invited) {
      Meteor.call("appointment/removeinvitee", this.props.appointment._id, this.props.member._id);
    } else {
      Meteor.call("appointment/addinvitee", this.props.appointment._id, this.props.member._id);
    }

    invited = !invited;

  },

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
          <span className="appnt-icon icon-cross"></span>
          { memberName }
        </div>
      )
    } else {
      listItem = (
        <div className="appnt-list-item list-item member" onClick={ this.toggleInvite }>
          <span className="appnt-icon icon-plus"></span>
          { memberName }
        </div>
      )
    }

    return listItem;
  }
});
