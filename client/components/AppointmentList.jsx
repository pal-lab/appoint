/*jshint esnext: true */

AppointmentList = React.createClass({
    propTypes: {
        appointments: React.PropTypes.array.isRequired
    },

    render() {
    var allAppointments = this.props.appointments.map((appointment) => {
      return (
        <AppointmentItem
          key={ appointment._id }
          appointment={ appointment } />
      );
    });

    return (
      <div className="content-scrollable list-items">
        { allAppointments }
      </div>
    );
  }
});
