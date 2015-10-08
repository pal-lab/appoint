/*jshint esnext: true */

HeaderBar = React.createClass({
  mixins: [ReactRouter.Navigation],

  propTypes: {
    status: React.PropTypes.string.isRequired,
    tasksLoading: React.PropTypes.bool,
  },
  render() {

    let nav;
    if (this.props.status === 'InboxPage') {
      nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">Inbox</div>
            <span className="icon-add" />
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
