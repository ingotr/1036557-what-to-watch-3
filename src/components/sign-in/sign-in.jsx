import React, {createRef, PureComponent} from 'react';
// import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();
  }

  render() {
    const {passwordError, loginError, onHandleSubmit} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="" className="sign-in__form" onSubmit={(evt) => {
            evt.preventDefault();
            onHandleSubmit(this.loginRef, this.passwordRef);
          }}>
            <div className="sign-in__message">
              {passwordError && <p>We can’t recognize this email <br/> and password combination. Please try again.</p>}
              {loginError && <p>Please enter a valid email address</p>}
            </div>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={this.loginRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={this.passwordRef}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
};

export default SignIn;
