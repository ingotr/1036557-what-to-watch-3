import * as React from 'react'
import * as validator from 'email-validator';

interface Props {
  onSubmit: (data: {login: string; password: string}) => void;
}

interface State {
  loginError: boolean;
  passwordError: boolean;
}

const withErrorsItem = (Component) => {
  class WithErrorsItem extends React.PureComponent<Props, State> {

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

  return WithErrorsItem;
};

export default withErrorsItem;
