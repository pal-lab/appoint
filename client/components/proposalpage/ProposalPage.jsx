/*jshint esnext: true */
const Link = ReactRouter.Link;

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
    return {
      proposals: AppointmentProposals.find().fetch(),
      appointment: Appointments.findOne({ _id: appointment_id }),
    };
  },

  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"ProposalPage"}
          showLoadingIndicator={this.data.tasksLoading}
          />

        <div className="content-scrollable">
          <ProposalList
            proposals={this.data.proposals}
            appointment = { this.data.appointment }
            />
        </div>
      </div>
    );
  }
});
