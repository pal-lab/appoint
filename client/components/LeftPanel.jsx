/*jshint esnext: true */
LeftPanel = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object,
  },
  render() {
    return (
      <section id="menu">
        <UserSidebarSection user={ this.props.currentUser } />
        <ul>
          <li>
            <Link
              to="addMember">
              Add a member
            </Link>
          </li>
        </ul>
      </section>
    );
  }
});
