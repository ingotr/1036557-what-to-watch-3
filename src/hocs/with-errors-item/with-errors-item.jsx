import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withErrorsItem = (Component) => {
  class WithErrorsItem extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        authErrorMessage: ``,
      };

      this.handleErrorMessage = this.handleErrorMessage.bind(this);
    }

    handleErrorMessage(error) {
      this.setState({
        authErrorMessage: error,
      });
    }

    render() {
      const {authErrorMessage} = this.state;

      return (
        <Component
          {...this.props}
          authErrorMessage={authErrorMessage}
          onError={this.handleErrorMessage}
        />
      );
    }
  }

  WithErrorsItem.propTypes = {
    authErrorMessage: PropTypes.string.isRequired,
  };

  return WithErrorsItem;
};

export default withErrorsItem;
