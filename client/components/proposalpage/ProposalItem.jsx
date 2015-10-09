/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },


  render() {
    let className = "list-item";
    let proposalDate = moment(this.props.proposal.date).format('DD/MM/YYYY - hh:mm');
    return (
      <div className={ className }>
      

          <li>{ proposalDate }</li>
      </div>
    );
  }
});
