/*jshint esnext: true */

HeaderBar = React.createClass({
  mixins: [ReactRouter.Navigation],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    tasksLoading: React.PropTypes.bool
  },

  render() {
    let nav;
      nav = (
        <nav>
          <div className="wrapper-message">
            <div className="title-message">{this.props.title}</div>
          </div>
        </nav>
      );
    return nav;
  }
});
