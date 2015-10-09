/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  acceptProposal() {
    Meteor.call('appointment/accept', this.props.appointment._id, this.props.proposal.date);
  },

  deleteProposal() {
    Meteor.call('appointment/reject', this.props.appointment._id, this.props.proposal.date);
  },

  render() {
    let date = moment(this.props.proposal.date).format('DD/MM/YYYY');
    let time = moment(this.props.proposal.date).format('hh:mm');

    const divStyle = {
      minWidth: '500px',
      textAlign: 'center'
    };

    return (
      <div className="">
        <div className="appnt-list-item list-item proposal">
          <span className="appnt-icon icon-cross" onClick={ this.deleteProposal }></span>

          <div className="wide" style={divStyle}>
            Datum:&nbsp;{date} &nbsp;&nbsp;&nbsp;&nbsp; Zeit:&nbsp;{time}
          </div>

          <span className="appnt-icon icon-check" onClick={ this.acceptProposal }></span>
        </div>
      </div>
    );
  }
});
