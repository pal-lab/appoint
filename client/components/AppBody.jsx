/*jshint esnext: true */
const {
  Link,
  Navigation,
  State,
  RouteHandler
} = ReactRouter;


// true if we should show an error dialog when there is a connection error.
// Exists so that we don't show a connection error dialog when the app is just
// starting and hasn't had a chance to connect yet.
const ShowConnectionIssues = new ReactiveVar(false);

const CONNECTION_ISSUE_TIMEOUT = 5000;


// Only show the connection error box if it has been 5 seconds since
// the app started
setTimeout(function () {
  // Show the connection error box
  ShowConnectionIssues.set(true);
}, CONNECTION_ISSUE_TIMEOUT);


// This component handles making the subscriptons to globally necessary data,
// handling router transitions based on that data, and rendering the basid app
// layout
AppBody = React.createClass({
  mixins: [ReactMeteorData, Navigation, State],

  getInitialState() {
    return {
      menuOpen: false,
      currentUser: Meteor.user()
    };
  },

  childContextTypes: {
    toggleMenuOpen: React.PropTypes.func.isRequired
  },

  getChildContext() {
    return {
      toggleMenuOpen: this.toggleMenuOpen
  };
  },

  getMeteorData() {
    const user = Meteor.user();
    const subHandles = [
        Meteor.subscribe("appointment", this.state.currentUser),
        //Meteor.subscribe("appointmentproposal")
    ];
    const subsReady = _.all(subHandles, function (handle) {
      return handle.ready();
    });

    // Get the current routes from React Router
    const routes = this.getRoutes();
    // If we are at the root route, and the subscrioptions are ready
    if (routes.length > 1 && routes[1].isDefault && subsReady) {
      // Redirect to the route for the first todo list
      this.replaceWith("inboxPage");
    }

    return {
      subsReady: subsReady,
      currentUser: this.state.currentUser,
      disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
    };
  },

  toggleMenuOpen() {
    this.setState({
      menuOpen: ! this.state.menuOpen
    });
  },

  render() {
    let appBodyContainerClass = "";

    if (Meteor.isCordova) {
      appBodyContainerClass += " cordova";
    }

    if (this.state.menuOpen) {
      appBodyContainerClass += " menu-open";
    }

    return (
      <div id="container" className={ appBodyContainerClass }>

        <LeftPanel
          currentUser={this.data.currentUser} />

        { this.data.disconnected ? <ConnectionIssueDialog /> : "" }

        <div className="content-overlay" onClick={ this.toggleMenuOpen }></div>

        <div id="content-container">
          { this.data.subsReady ?
            <RouteHandler /> :
            <AppLoading /> }
        </div>

      </div>
    );
  }
});
