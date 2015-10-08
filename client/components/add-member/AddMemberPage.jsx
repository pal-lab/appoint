const {
  Navigation,
  State
} = ReactRouter;

AddMemberPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    return {
      members: [
        {
          'id': 1,
          'firstname': 'Philipp'},
        {
          'id': 2,
          'firstname': 'Jorrit'},
        {
          'id': 3,
          'firstname': 'Johannes'},
        {
          'id': 4,
          'firstname': 'Sven'},
        {
          'id': 5,
          'firstname': 'Gregor'}
      ],
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
