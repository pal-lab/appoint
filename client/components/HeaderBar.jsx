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
    const earliest= moment().toDate();
    const latest= moment().add(7, 'days').toDate();

    const appointment = {latest: latest, earliest: earliest, purpose: 'Type to add purpose', location: 'Type to add location', duration: 180}

    Meteor.call('appointment/create', appointment, ['asd']);
  },
  render() {

    let nav;
    if (this.props.status === 'InboxPage') {
      nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">Inbox</div>
            <span className="icon-add" onClick={ this.onSubmitNewAppointment }/>

          </div>
        </nav>
      );
    } else if (this.props.status === 'NewAppointmentPage') {
   nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">New Appointment</div>
          </div>
        </nav>
      );
    } else if (this.props.status === 'AddMemberPage') {
   nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">Add Member</div>
          </div>
        </nav>
      );
    } else if (this.props.status === 'AppointmentPage') {
   nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">Appointment</div>
          </div>
        </nav>
      );
    }
    return nav;
  }
});
