/*jshint esnext: true */
const {
  Navigation,
  State
} = ReactRouter;

AppointmentPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    // Get appointment ID from ReactRouter
    const appointment_id = this.getParams().appointment_id;


    // Subscribe to the appointment we need to render this component
    const appointmentSubHandle = Meteor.subscribe("appointment", appointment_id);

    return {
      appointment: Appointments.findOne({ _id: appointment_id }),
      appointmentLoading: ! appointmentSubHandle.ready()
    };
  },

  render() {
    const appointment = this.data.appointment;

    if (! appointment) {
      return <AppNotFound />;
    }

    return (
      <div className="page lists-show">
        <HeaderBar
          // title={this.data.appointment.purpose}
          status={"AppointmentPage"}
          showLoadingIndicator={this.data.appointmentLoading} />

        <div className="content-scrollable list-items appointment-page">
          <AppointmentDetails
            appointment={this.data.appointment} />
        </div>
      </div>
    );
  }
});
