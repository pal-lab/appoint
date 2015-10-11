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
    const proposalsSubHandle = Meteor.subscribe("appointmentevents", appointment_id);
    var proposals = [];
    AppointmentEvents.find({
      type: 'proposed'
    }).forEach(function(prop) {
      var vote = AppointmentEvents.find({
        $and: [
          {
            date: prop.date,
            account: Meteor.userId()
          }, {
            $or: [
              {
                type: 'accepted'
              }, {
                type: 'rejected'
              }
            ]
          }
        ]
      }, {
        sort: {
          createdAt: -1
        },
        limit: 1
      }).fetch();
      if (vote.length > 0) {
        proposals.push({
          date: prop.date,
          vote: vote[0].type
        });
      } else {
        proposals.push({
          _id: vote._id,
          date: prop.date,
          vote: 'notVoted'
        });
      }
    });

    return {
      appointment: Appointments.findOne({ _id: appointment_id }),
      proposals: proposals
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
