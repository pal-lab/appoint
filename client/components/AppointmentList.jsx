/*jshint esnext: true */

AppointmentList = React.createClass({
  propTypes: {
    appointments: React.PropTypes.array.isRequired
  },

  render() {
    let allAppointments = this.props.appointments.map((appointment) => {
      return (
        <AppointmentItem
        key={ appointment._id }
        appointment={ appointment } />
        );
    });

    return (
      <div className="list-items">
      <ul>
      { allAppointments }
      </ul>
      </div>
      );
  }
});
