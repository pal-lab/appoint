/*jshint esnext: true */

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

  render() {
      let renderObject = (
        <div className="page appointment-details">
          <AppointmentTabBar
            appointment = { this.props.appointment }
            />
          <AppointmentSettings
            appointment = { this.props.appointment }
            />
          <AppointmentMembers
            invitedMembers = { this.props.invitedMembers }
            appointment = { this.props.appointment }
            />
        </div>
      );

      return renderObject;
  }
});
