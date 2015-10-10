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

    let renderObject;

    let earliest= moment(this.props.appointment.earliest).format('L');
    let latest= moment(this.props.appointment.latest).format('L');
    

    if(this.props.appointment.initiator === Meteor.user()._id && this.props.appointment.status === "draft") {
      
      renderObject = (
        <div className="row" style={{paddingTop: '50px'}}>
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Purpose</label>
                <input type="text"
                  className="form-control"
                  id="purpose"
                  ref="purpose"
                  placeholder="Give me a purpose"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.purpose}/>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  ref="location"
                  placeholder="Where do we meet?"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.location}
                  />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  ref="duration"
                  placeholder="Let's go all night baby."
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.duration}
                  />
              </div>
            </form>
          </div>
        </div>
      );

    } else {
        renderObject = (
          <div className="row" style={{paddingTop: '50px'}}>
            <div className="col-xs-12 col-md-8 col-md-offset-2">
            <div className="col-xs-12 col-md-12">
              <h2>{ this.props.appointment.purpose }</h2><br/>
            </div>
            <div className="col-xs-12 col-md-12">
              <p><span>Location:</span> { this.props.appointment.location } </p>
            </div>
            <div className="row col-xs-12 col-md-12">
              <div className="col-md-6">
                <p><span>Earliest:</span> { earliest } </p>
              </div>
              <div className="col-md-6">
                <p><span>Latest:</span> { latest } </p>
              </div>
            </div>
          </div>
          </div>
        );

    }

    return renderObject;
  }
});
