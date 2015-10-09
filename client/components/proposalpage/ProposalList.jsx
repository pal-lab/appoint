/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalList = React.createClass({
    propTypes: {
      proposals: React.PropTypes.array.isRequired,
      appointment: React.PropTypes.object.isRequired
    },

    render() {
    var allproposals = this.props.proposals.map((proposal) => {
      return (
        <ProposalItem
          key={ proposal._id }
          proposal={ proposal } />
      );
    });

    return (
      <div>
        <Link
            className="btn-primary"
            key={ this.props.appointment._id }
            to="appointmentpage"
            params={{ appointment_id: this.props.appointment._id }}>
              Zurück zu {this.props.appointment.purpose}
          </Link>

        <div className="list-items">
          { allproposals }
        </div>
      </div>
    );
  }
});