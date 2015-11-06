/*jshint esnext: true */
const Link = ReactRouter.Link;

AppointmentSettings = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
    scheduledEvent: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      appointment_id: this.props.appointment._id,
      purpose: this.props.appointment.purpose,
      location: this.props.appointment.location,
      duration: this.props.appointment.duration,
      earliest: moment(this.props.appointment.earliest).format('YYYY[-]MM[-]DD'),
      latest: moment(this.props.appointment.latest).format('YYYY[-]MM[-]DD')
    };
  },

  handleChange(e) {
    this.setState({
      purpose: this.refs.purpose.getDOMNode().value,
      location: this.refs.location.getDOMNode().value,
      duration: this.refs.duration.getDOMNode().value,
      earliest: this.refs.earliest.getDOMNode().value,
      latest: this.refs.latest.getDOMNode().value
    });
  },

  handleBlur() {

    if (this.refs.earliest.getDOMNode().value === "")
      earliestDate = null;
    else
      earliestDate = new Date(this.refs.earliest.getDOMNode().value);
    if (this.refs.latest.getDOMNode().value === "")
      latestDate = null;
    else
      latestDate = new Date(this.refs.latest.getDOMNode().value);

    this.updateAppointmentWithNewData({
      purpose: this.refs.purpose.getDOMNode().value,
      location: this.refs.location.getDOMNode().value,
      duration: this.refs.duration.getDOMNode().value,
      earliest: earliestDate,
      latest: latestDate
    });
    // console.log("Changes saved");
  },

  updateAppointmentWithNewData(newData) {
    Meteor.call("appointment/update",this.state.appointment_id,newData);
  },

  render() {

    let className = "appointment-settings";

    let renderObject;
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
              <div className="form-group">
                <label>Earliest</label>
                <input
                  type="date"
                  className="form-control"
                  id="earliest"
                  ref="earliest"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.earliest}
                />
              </div>
              <div className="form-group">
                <label>Latest</label>
                <input
                  type="date"
                  className="form-control"
                  id="latest"
                  ref="latest"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.latest}
                />
              </div>
            </form>
          </div>
        </div>
      );

    } else {
        renderObject = (
          <div className="row" style={{paddingTop: '50px', paddingBottom: '50px'}}>
            <div className="col-xs-12 col-md-8 col-md-offset-2">
            <div className="col-xs-12 col-md-12" style={{textAlign: 'center', paddingBottom: '25px'}}>
              <h2 >{ this.props.appointment.purpose }</h2>
              <p>
                <span className="status">Status:&nbsp;</span> { this.props.appointment.status}, { this.props.scheduledEvent.date}
              </p>
            </div>
            <div className="row col-md-12">
              <div className="col-md-6">
                <p><span>Location:</span> { this.props.appointment.location } </p>
              </div>
               <div className="col-md-6">
                <p><span>Earliest:</span> { this.state.earliest } </p>
              </div>
            </div>
            <div className="row col-md-12">
              <div className="col-md-6">
                <p><span>Duration:</span> { this.props.appointment.duration }min </p>
              </div>
              <div className="col-md-6">
                <p><span>Latest:</span> { this.state.latest } </p>
              </div>
            </div>
          </div>
          </div>
        );

    }

    return renderObject;
  }
});
