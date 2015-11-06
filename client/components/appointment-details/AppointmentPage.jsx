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
    let appointmentInitiator = null;
    if(Meteor.subscriptionManager.ready){
      appointmentInitiator = Appointments.findOne({ _id: appointment_id }).initiator;
      scheduledEvent= Meteor.appointmentQueries.scheduled(appointment_id);
    }
    return {
      scheduledEvent: scheduledEvent,
      appointment: Appointments.findOne({ _id: appointment_id }),
      invitedMembers: Meteor.users.find({ '_id': { $ne: appointmentInitiator } , 'profile.invitations': { $in: [ appointment_id ] }}, {
        emails: 1,
        profile: 1
        }).fetch()
    };
  },

  render() {
    const appointment = this.data.appointment;

    console.log(this.data.scheduledEvent);

    if (! appointment) {
      return <AppNotFound />;
    }

    return (
      <div className="page lists-show">
        <HeaderBar
          status={"AppointmentPage"}
          showLoadingIndicator={this.data.appointmentLoading} />

        <div className="content-scrollable list-items appointment-page">
          <AppointmentDetails
            appointment={this.data.appointment}
            scheduledEvent={this.data.scheduledEvent}
            invitedMembers={this.data.invitedMembers} />
        </div>
      </div>
    );
  }
});
