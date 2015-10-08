/*jshint esnext: true */

ProposalList = React.createClass({
    propTypes: {
        proposals: React.PropTypes.array.isRequired
    },

    render() {
    var allproposals = this.props.proposals.map((proposal) => {
      return (
        <Proposaltem
          key={ proposal._id }
          proposal={ proposal } />
      );
    });
    return (
      <div className="list-items">
        { allproposals }
      </div>
    );
  }
});