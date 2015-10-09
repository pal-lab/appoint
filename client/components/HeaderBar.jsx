/*jshint esnext: true */
const Link = ReactRouter.Link;
HeaderBar = React.createClass({
  mixins: [ReactRouter.Navigation],

  propTypes: {
    status: React.PropTypes.string.isRequired,
    tasksLoading: React.PropTypes.bool,
  },

   onSubmitNewAppointment(event) {
    event.preventDefault();

    let self = this;

    Meteor.call('appointment/create', function(err, data) {
      if (err)
        console.log(err);
      self.transitionTo('appointmentpage', {appointment_id: data});

    });

  },
  render() {

    let nav;
    if (this.props.status === 'InboxPage') {
      nav = (
        <nav>
          <MenuOpenToggle />
          <div className="wrapper-message">
            <div className="title-message">Inbox</div>
            <span className="icon-add" onClick={ this.onSubmitNewAppointment }/>

          </div>
        </nav>
      );
    } else if (this.props.status === 'NewAppointmentPage') {
   nav = (
        <nav>
          <MenuOpenToggle />
          <div className="wrapper-message">
            <div className="title-message">New Appointment</div>
          </div>
        </nav>
      );
    } else if (this.props.status === 'AddMemberPage') {
   nav = (
        <nav>
          <MenuOpenToggle />
          <div className="wrapper-message">
            <div className="title-message">Add Member</div>
          </div>
        </nav>
      );
    } else if (this.props.status === 'AppointmentPage') {
   nav = (
        <nav>
          <MenuOpenToggle />
          <div className="wrapper-message">
            <div className="title-message">Appointment</div>
          </div>
        </nav>
      );
    } else if (this.props.status === 'ProposalPage') {
   nav = (
        <nav>
          <MenuOpenToggle />
          <div className="wrapper-message">
            <div className="title-message">Proposal Dates </div>
          </div>
        </nav>
      );
    }
    return nav;
  }
});
