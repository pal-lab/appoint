/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

AddMemberList = React.createClass({

  mixins: [Navigation, State],
  
  propTypes: {
    members: React.PropTypes.array.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  backToAppointmentDetails() {
   this.transitionTo('appointmentpage', {appointment_id: this.props.appointment._id});
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          key = { member._id}
          member = { member }
          appointment = { this.props.appointment }/>
      );
    });

    return (
      <div >
        <ul className="nav nav-pills nav-justified">
            <li>
              <a onClick={ this.backToAppointmentDetails }>Back to Appointment</a>
            </li>
          </ul>
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});
