AppointmentSettings = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired
  },
 
  render() {
    let className = "appointment-settings";

    const earliest= moment(this.props.appointment.earliest).format('L');
    const latest= moment(this.props.appointment.latest).format('L');


    return (
      <div className={ className }>
        <p className="purpose">Purpose: {this.props.appointment.purpose}</p>
        <p className="location">Location: {this.props.appointment.location}</p>
        <p className="duration">Duration: {this.props.appointment.duration}</p>
        <p className="date">Earliest: {earliest} | Latest: {latest} </p>
        
      </div>
    );
  }
});
