/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },


  render() {
    let className = "list-item";
    let proposalDate = moment(this.props.proposal.date);
    return (
      <div className={ className }>
          { proposalDate.toString() }
      </div>
    );
  }
});
