/*jshint esnext: true */
NewAppointmentInput = React.createClass({
  propTypes: {

  },
  render() {

      return (
        <div className="content-scrollable list-items">

          <NewAppointmentSettings/>

          <NewAppointmentMembers/>

        </div>
      );
  }
});
