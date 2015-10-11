/*jshint esnext: true */

const Link = ReactRouter.Link;
const {
  Navigation,
  State
} = ReactRouter;

AppointmentTabBar = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired
  },

  sendInvitations() {
    Meteor.call('appointment/invite', this.props.appointment._id);
    console.log('Invitations sent!');
  },

  render() {
      let invitationButton;
      if ((this.props.appointment.initiator === Meteor.user()._id) && (this.props.appointment.status === 'draft')) {
        invitationButton = (
          <li>
              <a onClick={ this.sendInvitations }>Send Invitations</a>
          </li>
        );
      }

      let addMemberButton;
      if ((this.props.appointment.initiator === Meteor.user()._id) && (this.props.appointment.status === 'draft')) {
        addMemberButton = (
          <li>
            <Link
              className="list-todo"
              to="addMemberPage"
              params={{appointment_id: this.props.appointment._id}}
              >
              Add Friendz
            </Link>
          </li>
        );
      }

      let proposalsButton;
      if (this.props.appointment.status === 'voting') {
        proposalsButton = (
          <li>
            <Link
              className="list-todo"
              to="proposalpage"
              params={{appointment_id: this.props.appointment._id}}
              >
              Proposed Dates
            </Link>
          </li>
        );
      }

      let renderObject = (
        <div className="page appointment-details">
          <ul className="nav nav-pills nav-justified">
            <li>
              <Link
                className="list-todo"
                to="appointmentpage"
                params={{appointment_id: this.props.appointment._id}}
                >
                Overview
              </Link>
            </li>
            { proposalsButton }
            { addMemberButton }
            { invitationButton }
          </ul>
        </div>
      );

      return renderObject;
  }
});
