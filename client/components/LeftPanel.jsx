/*jshint esnext: true */
LeftPanel = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object,
  },
  render() {
    return (
      <section id="menu">
        <UserSidebarSection user={ this.props.currentUser } />
      </section>
    );
  }
});
