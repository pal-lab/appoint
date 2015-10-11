/*jshint esnext: true */
const Link = ReactRouter.Link;

ProposalItem = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  acceptProposal() {
    Meteor.call('appointment/accept', this.props.appointment._id, this.props.proposal.date);
    console.log('Accepted this proposal: ' + proposal.date);
  },

  deleteProposal() {
    Meteor.call('appointment/reject', this.props.appointment._id, this.props.proposal.date);
    console.log('Rejected this proposal: ' + proposal.date);
  },

  render() {
    let date = moment(this.props.proposal.date).format('DD/MM/YYYY');
    let time = moment(this.props.proposal.date).format('hh:mm');

    return (
      <div className="">
        <div className="appnt-list-item row proposal">
          <div className="col-xs-6 col-md-2" style={{ textAlign: 'center' }}>
            <span className="appnt-icon icon-cross" onClick={ this.deleteProposal }></span>
          </div>
          <div className="col-xs-6 col-md-push-8 col-md-2" style={{ textAlign: 'center' }}>
            <span className="appnt-icon icon-check" onClick={ this.acceptProposal }></span>
          </div>
          <div className="col-xs-12 col-md-5 col-md-pull-2">
            <div className="wide" style={{ textAlign: 'center' }}>
              Datum:&nbsp;{date} &nbsp;&nbsp;&nbsp;&nbsp; Uhrzeit:&nbsp;{time}
            </div>
          </div>
          <div className="col-xs-12 col-md-3 col-md-pull-2" style={{ textAlign: 'center' }}>
            {this.props.proposal.vote}
          </div>
        </div>
      </div>
    );
  }
});
