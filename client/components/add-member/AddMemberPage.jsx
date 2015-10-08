const {
  Navigation,
  State
} = ReactRouter;

AddMemberPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {

    const usersSubHandle = Meteor.subscribe("users");

    return {
      members: Meteor.users.find().fetch()
    };
  },

  render() {
    const members = this.data.members;

    if (!members) {
      return <AppNotFound />;
    }

    return (
      <div className="page lists-show">
        <HeaderBar
          // title={this.data.appointment.purpose}
          status={"AddMemberPage"}
          showLoadingIndicator={this.data.appointmentLoading} />
        <div className="content-scrollable list items addusers">
          <AddMemberList members={this.data.members} />
        </div>
      </div>
    );
  }
});
