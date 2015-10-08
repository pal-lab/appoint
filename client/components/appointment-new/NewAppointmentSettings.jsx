/*jshint esnext: true */
NewAppointmentSettings = React.createClass({
  propTypes: {

  },

  onSubmitNewAppointment(event) {
    event.preventDefault();

    //const listId = this.props.list._id;
    const input = React.findDOMNode(this.refs.purpose);
    const appointment = {latest: '2015-12-29 12:33', earliest: '2015-10-20 12:30', purpose: 'ffdsfdsfgsgfg', location: 'asd', duration: 180};
    appointment.purpose = input.value;
    // if (! taskText) {
      // Don't do anything if the input is empty
     // return;
    // }

   // Meteor.call('appointment/create', {latest: '2015-12-29 12:33', earliest: '2015-10-20 12:30', purpose: 'ffdsfdsfgsgfg', //location: 'asd', duration: 180}, ['asd']);


    Meteor.call('appointment/create', appointment, ['asd']);
  },

  render() {
    let className = "appointment-settings";

    const newAppointmentForm = (
      <form className="todo-new input-symbol"
          onSubmit={ this.onSubmitNewAppointment }>
        <input type="text" name="text" ref="purpose" placeholder="Type to add purpose" />
        <span className="icon-add" />
      </form>
    );

    const test = (
        <p> test </p>
    );


    return (
      <div className={ className }>
            { test }
            { newAppointmentForm }
      </div>
    );
  }
});
