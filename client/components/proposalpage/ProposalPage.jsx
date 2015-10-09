/*jshint esnext: true */
const {
  Navigation,
  State
} = ReactRouter;

ProposalPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    // Get list ID from ReactRouter
    const appointment_id = this.getParams().appointment_id;
    const proposalsSubHandle = Meteor.subscribe("appointmentproposal", appointment_id);
    console.log(appointment_id);
    return {
      proposals: AppointmentProposals.find().fetch()
      //list: Lists.findOne({ _id: listId }),
      //tasksLoading: ! tasksSubHandle.ready()
    };
  },

  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"ProposalPage"}
          showLoadingIndicator={this.data.tasksLoading} />

        <div className="content-scrollable">
          <ProposalList proposals={this.data.proposals}/>
        </div>
      </div>
    );
  }
});