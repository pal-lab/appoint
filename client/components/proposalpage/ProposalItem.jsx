const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },


  render() {
    let className = "list-item";

    return (
      <div className={ className }>

{this.props.appointment.purpose}

      </div>
    );
  }
});