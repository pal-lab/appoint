AppointmentItem = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },

  render() {
    let className = "list-item";

    return (
      <div className={ className }>
        <input
          type="text"
          value={this.props.appointment.purpose}
          placeholder="Purpose" />
      </div>
    );
  }
});
