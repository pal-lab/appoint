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
    //const tasksSubHandle = Meteor.subscribe("todos", listId);

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
      </div>
    );
  }
});
