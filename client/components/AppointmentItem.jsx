const Link = ReactRouter.Link;

AppointmentItem = React.createClass({
  propTypes: {
    appointment: React.PropTypes.object.isRequired,
  },


  render() {
    let className = "list-item";

    return (
      <li>
        
        <Link
          className={ className }
          key={ this.props.appointment._id }
          to="appointmentpage"
          params={{ appointment_id: this.props.appointment._id }}>
            {this.props.appointment.purpose}
        </Link>
        
        
      </li>
    );
  }
});
