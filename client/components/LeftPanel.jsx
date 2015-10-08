/*jshint esnext: true */
const Link = ReactRouter.Link;

LeftPanel = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object,
  },
  render() {
    return (
      <section id="menu">
        <UserSidebarSection user={ this.props.currentUser } />
        <div className="list-todos">

            <Link
              className="list-todo"
              to="inboxpage">
              Inbox
            </Link>
          <Link
            className="list-todo"
            to="addMember">
            Invite a friend
          </Link>
        </div>
      </section>
    );
  }
});
