/*jshint esnext: true */
const {
  Navigation,
  State
} = ReactRouter;

InboxPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    return {
      appointments: Appointments.find().fetch()
    };
  },
  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"InboxPage"}
          showLoadingIndicator={this.data.tasksLoading}
          />

        <div className="content-scrollable">
          <AppointmentList
            appointments={this.data.appointments}
            />
        </div>
      </div>
    );
  }
});
