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
          'firstname': 'Philipp DUMMY'},
        {
          'id': 2,
          'firstname': 'Jorrit DUMMY'},
        {
          'id': 3,
          'firstname': 'Johannes DUMMY'},
        {
          'id': 4,
          'firstname': 'Sven DUMMY'},
        {
          'id': 5,
          'firstname': 'Gregor DUMMY'}
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
