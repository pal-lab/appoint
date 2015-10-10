/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

ProposalList = React.createClass({

    mixins: [Navigation, State],
    
    propTypes: {
      proposals: React.PropTypes.array.isRequired,
      appointment: React.PropTypes.object.isRequired
    },

    navigateToAppointmentPage() {
      this.transitionTo('appointmentpage', {appointment_id: this.props.appointment._id});
    },

    render() {
    var allproposals = this.props.proposals.map((proposal) => {
      return (
        <ProposalItem
          key={ proposal._id }
          proposal={ proposal }
          appointment= { this.props.appointment }/>
      );
    });

    return (
      <div className="page proposals-list">
        <ul className="nav nav-pills nav-justified">
            <li>
              <a onClick={ this.navigateToAppointmentPage }>Back to Appointment</a>
            </li>
        </ul>

        <div className="list-items">
          { allproposals }
        </div>
      </div>
    );
  }
});
