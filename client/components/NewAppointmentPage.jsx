/*jshint esnext: true */
const {
  Navigation,
  State
} = ReactRouter;

NewAppointmentPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    // Get list ID from ReactRouter
    //const listId = this.getParams().listId;

    // Subscribe to the tasks we need to render this component
    //const appointments = Meteor.subscribe("appointment");

    return {
      //appointments: Appointments.find().fetch()
      //list: Lists.findOne({ _id: listId }),
      //tasksLoading: ! tasksSubHandle.ready()
    };
  },
  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"NewAppointmentPage"}
          showLoadingIndicator={this.data.tasksLoading} />
      </div>
    );
  }
});