import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import validator from "email-validator";

const withErrorsItem = (Component) => {
  class WithErrorsItem extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        loginError: false,
        passwordError: false,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(login, password) {
      const {onSubmit} = this.props;

      if (!validator.validate(login.current.value)) {
        this.setState({loginError: true});
        return;
      } else {
        this.setState({loginError: false});
      }

      if (password.current.value.length === 0) {
        this.setState({passwordError: true});
        return;
      } else {
        this.setState({passwordError: false});
      }

      onSubmit({
        login: login.current.value,
        password: password.current.value,
      });
    }

    render() {

      return (
        <Component
          {...this.props}
          onHandleSubmit={this.handleSubmit}
          loginError={this.state.loginError}
          passwordError={this.state.passwordError}
        />
      );
    }
  }

  WithErrorsItem.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  return WithErrorsItem;
};

export default withErrorsItem;
