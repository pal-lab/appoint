/*jshint esnext: true */
MemberItem = React.createClass({
  propTypes: {
    firstname: React.PropTypes.string,
    lastname: React.PropTypes.string,
    initials: React.PropTypes.string
  },

  render() {
    return (

        <div className="circle">{ this.props.initials }</div>

    );
  }
});
