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
        <nav className="top-nav">
          <div className="col-xs-3 col-flex-center">
            <MenuOpenToggle />
          </div>
          <div className="col-xs-6 col-flex-center">
            <div className="title-message">Inbox</div>
          </div>
          <div className="col-xs-3 col-flex-center">
            <button onClick={ this.onSubmitNewAppointment } className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>
              NEW
            </button>
          </div>
        </nav>
      );
    } else if (this.props.status === 'NewAppointmentPage') {
   nav = (
        <nav className="top-nav">
          <div className="col-xs-3 col-flex-center">
            <MenuOpenToggle />
          </div>
          <div className="col-xs-6 col-flex-center">
            <div className="title-message">New Appointment</div>
          </div>
          <div className="col-xs-3 col-flex-center">
          </div>
        </nav>
      );
    } else if (this.props.status === 'AddMemberPage') {
   nav = (
        <nav className="top-nav">
          <div className="col-xs-3 col-flex-center">
            <MenuOpenToggle />
          </div>
          <div className="col-xs-6 col-flex-center">
            <div className="title-message">Add Member</div>
          </div>
          <div className="col-xs-3 col-flex-center">
          </div>
        </nav>
      );
    } else if (this.props.status === 'AppointmentPage') {
   nav = (
<nav className="top-nav">
          <div className="col-xs-3 col-flex-center">
            <MenuOpenToggle />
          </div>
          <div className="col-xs-6 col-flex-center">
            <div className="title-message">Appointment</div>
          </div>
          <div className="col-xs-3 col-flex-center">
          </div>
        </nav>      );
    } else if (this.props.status === 'ProposalPage') {
   nav = (
        <nav className="top-nav">
          <div className="col-xs-3 col-flex-center">
            <MenuOpenToggle />
          </div>
          <div className="col-xs-6 col-flex-center">
            <div className="title-message">Proposed Dates</div>
          </div>
          <div className="col-xs-3 col-flex-center">
          </div>
        </nav>      );
    }
    return nav;
  }
});
