/*jshint esnext: true */

AppointmentList = React.createClass({
    propTypes: {
        appointments: React.PropTypes.array.isRequired
    },

    render() {
        var allAppointments = this.props.appointments.map((appointment) => {
            return (
                <p>{appointment.title}</p>
            );
        });

        return (
            <div>
                <div className="content-scrollable list-items">
                    {allAppointments}
                </div>
            </div>
        );
    }
});
