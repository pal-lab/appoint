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
      <div className="wrapper">
        <div className="appnt-list-item list-item member" onClick={ this.deleteProposal }>
          <span className="appnt-icon icon-cross"></span>
        </div>

        
          Uhrzeit: {date} --> Zeit: {time}
        

        <div className="appnt-list-item list-item member" onClick={ this.acceptProposal }>
          <span className="appnt-icon icon-plus"></span>
          
        </div>        

      </div>
    );
  }
});
