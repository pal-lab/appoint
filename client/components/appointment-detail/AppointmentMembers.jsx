AppointmentMembers = React.createClass({
  propTypes: {
    invitees: React.PropTypes.object.isRequired
  },
 
  render() {
    let className = "appointment-members";

    return (
      <div className={ className }>
        <button type="submit" className="btn-primary">
                Members
        </button>
    
      </div>
    );
  }
});
