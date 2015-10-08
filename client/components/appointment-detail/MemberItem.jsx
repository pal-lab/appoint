MemberItem = React.createClass({
  propTypes: {
    firstname: React.PropTypes.string,
    lastname: React.PropTypes.string,
  },

  render() {
    return (
      <div className="list-item member">
        { this.props.firstname } &nbsp; { this.props.lastname }
      </div>
    );
  }
});
