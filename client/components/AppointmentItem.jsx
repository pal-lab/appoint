const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

AppointmentItem = React.createClass({
  mixins: [Navigation, State],

  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },

  openAppointment() {
    this.transitionTo('appointmentpage', {appointment_id: this.props.appointment._id});
  },

  acceptAppointment(){ 
    Meteor.call('appointment/accept', this.props.appointment._id);
  },

  declineAppointment(){ 
    Meteor.call('appointment/decline', this.props.appointment._id);
  },

  checkAcknowledged() {
    if (this.props.appointment.status === "invited"){
      let count = AppointmentEvents.find({$and: [{
        account: Meteor.userId()
      }, {
        $or: [{
          type: 'approved'
        }, {
          type: 'declined'
        }]
      }]}).count();
      if(count>0){
        return true;
      } else{
        return false;
      }
    } else {
      return true;
    }

  },


  render() {
    let className = "list-item";

    let renderObject;

    console.log(this.checkAcknowledged());

    if (!this.checkAcknowledged()){
      renderObject = (
        <div className="row appointment-item" >
          <div className="col-md-4" onClick={ this.openAppointment }>
            <h4>{ this.props.appointment.purpose }</h4>
          </div>
          <div className="col-md-6 col-full-height" onClick={ this.openAppointment }>
            <p><span className="appointment-label">Location:</span> { this.props.appointment.location } </p>
            <p><span className="appointment-label">Duration:</span> { this.props.appointment.duration } minutes </p>
            <p><span className="appointment-label">Status:</span> { this.props.appointment.status } </p>
          </div>
          <div className="col-md-2 col-full-hight">
            <p><span className="appnt-icon icon-check" onClick={ this.acceptAppointment }></span></p>
            <p><span className="appnt-icon icon-cross" onClick={ this.declineAppointment }></span></p>
          </div>
        </div>
      );
    } else {
      renderObject = (
        <div className="row appointment-item" onClick={ this.openAppointment }>
          <div className="col-md-4">
            <h4>{ this.props.appointment.purpose }</h4>
          </div>
          <div className="col-md-6 col-full-height">
            <p><span className="appointment-label">Location:</span> { this.props.appointment.location } </p>
            <p><span className="appointment-label">Duration:</span> { this.props.appointment.duration } minutes </p>
            <p><span className="appointment-label">Status:</span> { this.props.appointment.status } </p>
          </div>
        </div>
      );
    }
    return renderObject;
  }
});
