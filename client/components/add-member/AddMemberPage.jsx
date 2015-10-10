const {
  Navigation,
  State
} = ReactRouter;

AddMemberPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    const appointment_id = this.getParams().appointment_id;
    const usersSubHandle = Meteor.subscribe("users");
    const appointmentInitiator = Appointments.findOne({ _id: appointment_id }).initiator;

    return {
      appointment: Appointments.findOne({ _id: appointment_id }),
      members: Meteor.users.find({ '_id': { $ne: appointmentInitiator }}).fetch()
    };
  },

  render() {
    const members = this.data.members;

    if (!members) {
      return <AppNotFound />;
    }

    return (
      <div className="page lists-show">
        <HeaderBar
          status={"AddMemberPage"}
          showLoadingIndicator = { this.data.appointmentLoading }  />

        <div className="content-scrollable list items addusers">
          <AddMemberList
            members = { this.data.members }
            appointment = { this.data.appointment }/>
        </div>
      </div>
    );
  }
});
