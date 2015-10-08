const {
  Navigation,
  State
} = ReactRouter;

AddMemberPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    const appointment_id = this.getParams().appointment_id;
    const usersSubHandle = Meteor.subscribe("users");

    return {
      appointment: Appointments.findOne({ _id: appointment_id }),
      members: Meteor.users.find().fetch()
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
          // title={this.data.appointment.purpose}
          status={"AddMemberPage"}
          showLoadingIndicator = { this.data.appointmentLoading }
          />
        <h1>{ this.data.appointment }</h1>

        <div className="content-scrollable list items addusers">
          <AddMemberList
            members = { this.data.members }
            appointment = { this.data.appointment }
            />
        </div>
      </div>
    );
  }
});
