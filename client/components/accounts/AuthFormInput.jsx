/*jshint esnext: true */
AuthFormInput = React.createClass({
  propTypes: {
    hasError: React.PropTypes.bool,
    label: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string
  },
  render() {
    let className = "input-symbol form-group";
    if (this.props.hasError) {
      className += " error";
    }

    return (
      <div className={ className } style={{ position: 'relative' }} >
        <span
          className={ this.props.iconClass }
          title={ this.props.label }
          style={{ position: 'absolute', left: '10px', lineHeight: '34px' }}
          />

        <input
          type={ this.props.type }
          name={ this.props.name }
          placeholder={ this.props.label }
          className="form-control"
          style={{ paddingLeft: '40px' }}
          />

      </div>
    );
  }
});
