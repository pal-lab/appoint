UserSettings = React.createClass({
  propTypes: {
    proposal: React.PropTypes.object.isRequired,
  },

onSubmitChangeNames(event) {
    event.preventDefault();
    const firstnameinput = React.findDOMNode(this.refs.firstname);
    const lastnameinput = React.findDOMNode(this.refs.lastname);
    console.log(firstnameinput.value);
    console.log(lastnameinput.value);
    if(firstnameinput.value !='' && lastnameinput.value !='') {
      Meteor.call('user/changenames', firstnameinput.value, lastnameinput.value);
    }
},

  render() {
    let className = "user-settings";
    const changeFirstNameForm = (
      <form className="todo-new input-symbol"
          onSubmit={ this.onSubmitChangeNames}>
        <input type="text"  name="text" ref="firstname" placeholder="enter new first name" />
      </form>
    );
     const changeLastNameForm = (
      <form className="todo-new input-symbol"
          onSubmit={ this.onSubmitChangeNames}>
        <input type="text" name="text" ref="lastname" placeholder="enter new last name" />
      </form>
    );
    return (
      <div className="page">
      {changeFirstNameForm}
      {changeLastNameForm}
        <Profile />
        <SettingsList />
      </div>
    )
  }
});

Profile = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },

  funnyUserInteractions() {
    let choice = Math.round(Math.random() * 10) + 1;
    let firstname = this.data.user.profile.firstname;
    let msg;

    switch (choice) {
        case 1:
          return 'Okay, lets do it. We CAN change your user name together you little hero';
        case 2:
          return '@Appoint is rewarding users for spending time on their site';
        case 3:
            return 'Rock on little hero ;-)';
        case 4:
            return 'NO! DON`T USE THIS BUTTON ... oh okay my fail, it`s not a button';
        case 5:
            return 'I`m going to make you an offer you can`t refuse.';
        case 6:
            return 'Go ahead, make my day.';
        case 7:
          return 'Gentlemen, you cant fight in here! This is the War Room!';
        case 8:
            return 'The greatest trick the devil ever pulled was convincing the world he did not exist.';
        case 9:
            return 'You had me at `hello´';
        default:
            return 'Hello my friend ...'
    }
  },

  render() {
    if (!this.data.user) {
      return (
        <h2>Please Log in</h2>
      )
    }
    let initials = this.data.user.profile.firstname.charAt(0).concat(this.data.user.profile.lastname.charAt(0));

    const divStyle = {
      minWidth: '500px',
      textAlign: 'center'
    };

    return (
      <div className="profile-wrapper">
        <div className="image-wrapper">
          <div className="circle--big">{ initials }</div>
        </div>
        <div className="login-wrapper">
          Hallo, &nbsp;{ this.data.user.profile.firstname }! <br/>

        </div>
        <div className="wide" style={divStyle}>
          { this.funnyUserInteractions() }
        </div>
      </div>
    )
  }
})

SettingsList = React.createClass({
  getDefaultProps() {
    return {
      settings: ["Setting 1", "Setting 2", "Setting 3"]
    }
  },
  render() {
  let list = this.props.settings.map((setting) => {
    return (
      <div className="item" key={setting}>
        <a>{setting}</a>
      </div>
    )
  })
  return (
    <div className="list-items">
      {list}
    </div>
  )
}
})
