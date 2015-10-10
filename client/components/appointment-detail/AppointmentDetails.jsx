/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

AppointmentDetails = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    invitedMembers: React.PropTypes.array.isRequired
  },

  sendInvitations() {
    console.log('yeahhh');
    Meteor.call('appointment/invite', this.props.appointment._id);
  },

  navigateToAddMemberPage() {
    this.transitionTo('addMemberPage', {appointment_id: this.props.appointment._id});
  },

  navigateToProposalPage() {
   this.transitionTo('proposalpage', {appointment_id: this.props.appointment._id});
  },

  navigateToInboxPage() {
   this.transitionTo('inboxPage');
  },

  render() {

      let invitationButton;
      let addMemberButton;

      if (this.props.appointment.initiator === Meteor.user()._id && this.props.appointment.status === "draft") {
        invitationButton = (
          <li>
              <a onClick={ this.sendInvitations }>Send Invitations</a>
          </li>
          );
      }

      if (this.props.appointment.initiator === Meteor.user()._id && this.props.appointment.status === "draft") {
        addMemberButton = (
          <li>
              <a onClick={ this.navigateToAddMemberPage }>Add Friendz</a>
          </li>
          );
      }


      return (
        <div className="page appointment-details">
          <ul className="nav nav-pills nav-justified">
            <li>
              <a onClick = { this.navigateToInboxPage }>
                Inbox
              </a>
            </li>
            <li>
              <a onClick={ this.navigateToProposalPage }>Proposals</a>
            </li>
            { addMemberButton }
            { invitationButton }
          </ul>

          <AppointmentSettings
            appointment={this.props.appointment}/>

          <AppointmentMembers
            invitedMembers={this.props.invitedMembers}
            appointment={this.props.appointment}/>

        </div>
      );
  }
});
