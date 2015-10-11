/*jshint esnext: true */
const Link = ReactRouter.Link;

const {
  Navigation,
  State
} = ReactRouter;

UserSidebarSection = React.createClass({

  mixins: [Navigation, State],

  getInitialState() {
    return {
      menuOpen: false
    };
  },

  propTypes: {
    user: React.PropTypes.object
  },

  toggleMenuOpen(event) {
    event.preventDefault();

    this.setState({
      menuOpen: ! this.state.menuOpen
    });
  },

  logout() {
    this.transitionTo('signin');
    Meteor.logout();
  },

  render() {
    let contents;

    if (this.props.user) {
      const email = this.props.user.emails[0].address;

      const arrowDirection = this.state.menuOpen ? "up" : "down";
      const arrowIconClass = "icon-arrow-" + arrowDirection;

      contents = (
        <div className="btns-group-vertical">
          <a href="#" className="btn-secondary" onClick={ this.toggleMenuOpen }>
            <span className={ arrowIconClass } />
            { this.props.user.profile.firstname }
          </a>
          { this.state.menuOpen ?
            <a className="btn-secondary" onClick={ this.logout } >Logout</a> : ""}
        </div>
      );
    } else {
      contents = (
        <div className="btns-group">
          <Link to="signin" className="btn-secondary">Login</Link>
          <Link to="join" className="btn-secondary">Join</Link>
        </div>
      );
    }

    return (
      <div>
        { contents }
      </div>
    );
  }
});
