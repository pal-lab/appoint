const {
  Navigation,
  State
} = ReactRouter;

AddMemberPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    return {
      members: Accounts.fetch(),
    };
  },

  render() {
    const members = this.data.members;

    if (!members) {
      return <AppNotFound />;
    }

    return (
      <div className="page add-members">
        <AddMemberList members={this.data.members} />
      </div>
    );
  }
});
