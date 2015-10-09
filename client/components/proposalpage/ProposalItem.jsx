/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },

  acceptProposal() {
    Meteor.call("proposal/accept", this.props.proposal._id);
  },

  deleteProposal() {
    Meteor.call("proposal/denied", this.props.proposal._id);
  },

  render() {
    let className = "list-item";
    let date = moment(this.props.proposal.date).format('DD/MM/YYYY');
    let time = moment(this.props.proposal.date).format('hh:mm');
    return (
      <li className={ className }>
       
        <span className="text">
          Uhrzeit: {date} --> Zeit: {time}
        </span>

        <div className="delete" onClick={this.deleteProposal}>
          <span className="icon-cross"></span>
        </div>

        <div className="accept" onClick={this.acceptProposal}>
          <span className="icon-check"></span>
        </div>
        

      </li>
    );
  }
});
