ProposalPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    // Get list ID from ReactRouter
    //const listId = this.getParams().listId;

    return {
      proposals: AppointmentProposals.find().fetch()
      //list: Lists.findOne({ _id: listId }),
      //tasksLoading: ! tasksSubHandle.ready()
    };
  },

  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"ProposalPage"}
          showLoadingIndicator={this.data.tasksLoading} />

        <div className="content-scrollable">
          <ProposalList proposals={this.data.proposals}/>
        </div>
      </div>
    );
  }
});