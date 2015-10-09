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

  openAddMemberPage() {
    this.transitionTo('addMemberPage', {appointment_id: this.props.appointment._id});
  },

  openProposalsPage() {
   this.transitionTo('proposalpage', {appointment_id: this.props.appointment._id});
  },

  openInboxPage() {
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
              <a onClick={ this.openAddMemberPage }>Add Friendz</a>
          </li>
          );
      }


      return (
        <div className="page appointment-details">
          <ul className="nav nav-pills nav-justified">
            <li>
              <a onClick={ this.openInboxPage }>Home</a>
            </li>
            <li>
              <a onClick={ this.openProposalsPage }>Proposals</a>
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
