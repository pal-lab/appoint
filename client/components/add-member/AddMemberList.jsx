/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

AddMemberList = React.createClass({

  mixins: [Navigation, State],

  propTypes: {
    members: React.PropTypes.array.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  render() {
    var allMembers = this.props.members.map((member) => {
      return (
        <AddMemberItem
          key = { member._id}
          member = { member }
          appointment = { this.props.appointment }
          />
      );
    });

    return (
      <div className="page member-list">
        <AppointmentTabBar
          appointment = { this.props.appointment }
          />
        <div className="list-items">
          { allMembers }
        </div>
      </div>
    );
  }
});
