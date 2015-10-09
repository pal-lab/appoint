const Link = ReactRouter.Link;

AppointmentSettings = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      // TODO: Abruf des wirklichen Status
      editableAppointment: this.props.appointment.status,
      appointment_id: this.props.appointment._id,
      purpose: this.props.appointment.purpose,
      location: this.props.appointment.location,
      duration: this.props.appointment.duration,
      earliest: moment(this.props.appointment.earliest),
      latest: moment(this.props.appointment.latest)
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
      earliest: this.state.earliest.toDate(),
      latest: this.state.latest.toDate()
    });
    console.log("Changes saved");
  },

  updateAppointmentWithNewData(newData) {
    // Meteor.update({_id: this.state.appointment_id}, {$set: newData });
    Meteor.call("appointment/update",this.state.appointment_id,newData);
  },

  render() {
    let className = "appointment-settings";

    let appointmentSettings;


    if(!this.state.editableAppointment === "draft") {
      const earliest= moment(this.props.appointment.earliest).format('L');
      const latest= moment(this.props.appointment.latest).format('L');
      appointmentSettings = (
        <div className={ className }>
          <p className="purpose">Purpose: {this.props.appointment.purpose}</p>
          <p className="location">Location: {this.props.appointment.location}</p>
          <p className="duration">Duration: {this.props.appointment.duration}</p>
          <p className="date">Earliest: {earliest} | Latest: {latest} </p>
        </div>
      )

    } else {
      const earliest= moment(this.props.appointment.earliest).format('L');
      const latest= moment(this.props.appointment.latest).format('L');
      appointmentSettings = (
        <div className="row" style={{paddingTop: '50px'}}>
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="purpose">Purpose</label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  placeholder="Give me a purpose"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.purpose}
                  />
              </div>
              <div className="form-group">
                <label for="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="Where do we meet?"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.location}
                  />
              </div>
              <div className="form-group">
                <label for="duration">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  placeholder="Let's go all night baby."
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.duration}
                  />
              </div>
            </form>
          </div>
        </div>
      )

    }

    return appointmentSettings;
  }
});
