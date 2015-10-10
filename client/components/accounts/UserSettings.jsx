const Link = ReactRouter.Link;

UserSettings = React.createClass({
  propTypes: {
  },

  getInitialState() {
let user = Meteor.user();
    return {
     firstname: user.profile.firstname,
     lastname: user.profile.lastname
    };
  },

  handleChange(e) {
    this.setState({
      firstname: this.refs.firstname.getDOMNode().value,
      lastname: this.refs.lastname.getDOMNode().value
    });
  },

  handleBlur() {
    this.updateUserNames({
      firstname: this.refs.firstname.getDOMNode().value,
      lastname: this.refs.lastname.getDOMNode().value
    });
    console.log("Changes saved");
  },

  updateUserNames(newData) {
    Meteor.call("user/changenames", newData.firstname, newData.lastname);
  },

  render() {
    let className = "appointment-settings";
    let renderObject;
      renderObject = (
        <div>
        <UserProfile />
        <div className="row" style={{paddingTop: '50px'}}>
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text"
                  className="form-control"
                  id="firstname"
                  ref="firstname"
                  placeholder="Enter new First Name"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.firstname}/>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  ref="lastname"
                  placeholder="Enter new Last Name"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.state.lastname}
                  />
              </div>
            </form>
          </div>
        </div>
        </div>
      );

    return renderObject;
  }
});