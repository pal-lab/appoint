AppointmentSettings = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      // TODO: Abruf des wirklichen Status
      editableAppointment: true,
      appointment_id: this.props.appointment._id,
      purpose: this.props.appointment.purpose,
      location: this.props.appointment.location,
      duration: this.props.appointment.duration,
      earliest: this.props.appointment.earliest,
      latest: this.props.appointment.latest
    };
  },

  handleChange(e) {
    this.setState({
      purpose: this.refs.purpose.getDOMNode().value,
      location: this.refs.location.getDOMNode().value,
      duration: this.refs.duration.getDOMNode().value,
    });
  },

  handleBlur() {
    this.updateAppointmentWithNewData({
      purpose: this.refs.purpose.getDOMNode().value,
      location: this.refs.location.getDOMNode().value,
      duration: this.refs.duration.getDOMNode().value,
      earliest: this.state.earliest,
      latest: this.state.latest
    });
    console.log("Changes saved");
  },

  updateAppointmentWithNewData(newData) {
    // Meteor.update({_id: this.state.appointment_id}, {$set: newData });
    Meteor.call("appointment/update",this.state.appointment_id,newData);
  },

 
  render() {
    let className = "appointment-settings";

    const earliest= moment(this.props.appointment.earliest).format('L');
    const latest= moment(this.props.appointment.latest).format('L');

    let appointmentSettings;

    
    if(!this.state.editableAppointment) {
      appointmentSettings = (
        <div className={ className }>
          <p className="purpose">Purpose: {this.props.appointment.purpose}</p>
          <p className="location">Location: {this.props.appointment.location}</p>
          <p className="duration">Duration: {this.props.appointment.duration}</p>
          <p className="date">Earliest: {earliest} | Latest: {latest} </p>
        </div>
      )

    } else {
      appointmentSettings = (
        
        <div>
           
          <form onSubmit={this.handleSubmit}>
            <input
              name="purpose"
              ref="purpose"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.purpose}/> <br/>
            <input
              name="location"
              ref="location"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.location}/> <br/>
            <input
              name="duration"
              ref="duration"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.duration}/>
          </form>
        </div>

      )
    }

    return appointmentSettings;
  }
});
