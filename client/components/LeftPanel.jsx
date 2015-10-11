/*jshint esnext: true */
const Link = ReactRouter.Link;

LeftPanel = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object,
  },
  render() {
    let menuItems = null;
    if (Meteor.user()){
      menuItems = (
          <div className="list-todos">
          <Link
            className="list-todo"
            to="inboxPage">
            Inbox
          </Link>
          <Link
            className="list-todo"
            to="settings">
            Settings
          </Link>
        </div>
        );
    }
    return (
      <section id="menu">
        <UserSidebarSection user={ this.props.currentUser } />
        { menuItems }
      </section>
    );
  }
});
