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
    // const appointmentSubHandle = Meteor.subscribe("appointment");
    const membersSubHandle = Meteor.subscribe("users");
    const proposalSubHandle = Meteor.subscribe('appointmentevents', appointment_id);
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
    //console.log(prop, vote);
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

    console.log(proposals);
    });
    const appointmentInitiator = Appointments.findOne({ _id: appointment_id }).initiator;
    return {
      appointment: Appointments.findOne({ _id: appointment_id }),
      invitedMembers: Meteor.users.find({ '_id': { $ne: appointmentInitiator } , 'profile.invitations': { $in: [ appointment_id ] }}, {
        emails: 1,
        profile: 1
        }).fetch(),
    // get the proposals and the last voting the user did for each voting
      proposals: proposals
      // appointmentLoading: ! appointmentSubHandle.ready()
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
            appointment={this.data.appointment}
            invitedMembers={this.data.invitedMembers} />
        </div>
      </div>
    );
  }
});
