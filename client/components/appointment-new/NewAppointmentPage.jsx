const {
  Navigation,
  State
} = ReactRouter;

NewAppointmentPage = React.createClass({


  render() {

    return (
      <div className="page lists-show">
        <HeaderBar
          // title={this.data.appointment.purpose}
          status={"NewAppointmentPage"}
          />


          <NewAppointmentInput/>
      </div>
    );
  }
});
