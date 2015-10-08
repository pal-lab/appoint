/*jshint esnext: true */
const {
  Navigation,
  State
} = ReactRouter;

InboxPage = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getMeteorData() {
    // Get list ID from ReactRouter
    //const listId = this.getParams().listId;

    // Subscribe to the tasks we need to render this component
    const appoints = Meteor.subscribe("appointment");

    return {
      //tasks: Todos.find({ listId: listId }, {sort: {createdAt : -1}}).fetch(),
      //list: Lists.findOne({ _id: listId }),
      //tasksLoading: ! tasksSubHandle.ready()
    };
  },

  render() {
    return (
      <div className="page lists-show">
        <HeaderBar
          status={"InboxPage"}
          showLoadingIndicator={this.data.tasksLoading} />
      <AppointmentList appointments={[{title : "title-1"},{title : "title-2"}]}/>
      </div>
    );
  }
});
