const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },


  render() {
    let className = "list-item";
console.log(this.props.proposal);
    return (
      <div className={ className }>

{this.props.proposal.appointment}

      </div>
    );
  }
});