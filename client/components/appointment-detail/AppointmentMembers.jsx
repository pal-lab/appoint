const Link = ReactRouter.Link;

AppointmentMembers = React.createClass({
  mixins: [ReactRouter.Navigation],
  propTypes: {
    invitedMembers: React.PropTypes.array.isRequired,
    appointment: React.PropTypes.object.isRequired
  },

  handleClick() {
    this.transitionTo('addMemberPage', {appointment_id: this.props.appointment._id});
  },

  render() {
    let className = "appointment-members";

    var allMembers = this.props.invitedMembers.map((member) => {
      return (
        <MemberItem
          key = { member._id}
          firstname = {member.profile.firstname}
          lastname = {member.profile.lastname}
          initials = {member.profile.firstname.charAt(0).concat(member.profile.lastname.charAt(0))}/>
      );
    });

    return (
      <div className="list-items">
        { allMembers }
        <button type="submit" className="btn-primary" onClick= {this.handleClick}>
                Add Members
        </button>


      </div>
    );
  }
});
