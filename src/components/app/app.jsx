import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {getPromoMovie, getMoviesByGenre} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import SignIn from '../sign-in/sign-in.jsx';
import withErrorsItem from '../../hocs/with-errors-item/with-errors-item.jsx';

const MoviePageWrapped = withActiveItem(MoviePage);
const MainWrapped = withActiveItem(Main);
const SignInWrapped = withErrorsItem(SignIn);

const movieHoverHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showMovieInfo: false
    };
  }

  _clickHandler() {
    this.setState((state) => ({
      showMovieInfo: !state.showMovieInfo
    }));
  }

  _renderMainPage() {
    const {movies, film, authorizationStatus} = this.props;
    const {showMovieInfo} = this.state;

    if (!showMovieInfo) {
      return (
        <MainWrapped
          authorizationStatus={authorizationStatus}
          film={film}
          onMouseClick={this._clickHandler.bind(this)}
          onMovieHover={movieHoverHandler}
        />
      );
    }

    if (showMovieInfo) {
      return (
        <MoviePageWrapped
          movies={movies}
          film={film}
        />
      );
    }

    return null;
  }

  render() {
    const {film, login, authorizationStatus} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/dev-film">
            <MainWrapped
              film={film}
            />
          </Route>
          <Route exact path="/auth-dev" render={() => {
            if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
              return <SignInWrapped
                onSubmit={login}
              />;
            } else if (authorizationStatus === AuthorizationStatus.AUTH) {
              return this._renderMainPage();
            }
            return null;
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.number,
        image: PropTypes.string,
        poster: PropTypes.string,
        cover: PropTypes.string,
        previewSrc: PropTypes.string,
        runtime: PropTypes.string,
        rating: PropTypes.number,
        votes: PropTypes.number,
        director: PropTypes.string,
        description: PropTypes.string,
        starring: PropTypes.arrayOf(PropTypes.string),
        reviews: PropTypes.array,
      })
  ),

  film: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    poster: PropTypes.string,
    cover: PropTypes.string,
    previewSrc: PropTypes.string,
    runtime: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    description: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    reviews: PropTypes.array,
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMoviesByGenre(state),
  film: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData, onSuccess, onError) {
    dispatch(UserOperation.login(authData, onSuccess, onError));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

