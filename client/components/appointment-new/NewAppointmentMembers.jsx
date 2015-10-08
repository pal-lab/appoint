/*jshint esnext: true */
NewAppointmentMembers = React.createClass({
  propTypes: {

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
