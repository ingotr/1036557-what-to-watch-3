import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {getPromoMovie, getMoviesByGenre} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as CommentsOperation} from '../../reducer/review/review.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import SignIn from '../sign-in/sign-in.jsx';
import VideoPlayerFull from '../../components/video-player-full/video-player-full.jsx';
import AddReview from '../../components/add-review/add-review.jsx';
import withErrorsItem from '../../hocs/with-errors-item/with-errors-item.jsx';
import history from '../../history.js';
import MyList from '../my-list/my-list.jsx';
import PrivateRoute from '../private-route/private-route.jsx';

const MoviePageWrapped = withActiveItem(MoviePage);
const MainWrapped = withActiveItem(Main);
const SignInWrapped = withErrorsItem(SignIn);
const MyListWrapped = withActiveItem(MyList);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onMovieClick = this._onMovieClick.bind(this);
  }

  _onMovieClick(film) {
    this.props.onItemEnter(film);
    history.push(`/films/${film.id}`);
  }

  render() {
    const {movies, film, authorizationStatus, changeFavoriteStatus,
      login, sendComment, onItemLeave} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <MainWrapped
              authorizationStatus={authorizationStatus}
              film={film}
              onMovieCardClick={this._onMovieClick}
              onFilmFavoriteStatusClick={changeFavoriteStatus}
            />
          </Route>
          <PrivateRoute
            exact
            path="/mylist"
            render={() => {
              return (
                <MyListWrapped
                  authorizationStatus={authorizationStatus}
                  movies={movies}
                  onMovieCardClick={this._onMovieClick}
                  onFilmFavoriteStatusClick={changeFavoriteStatus}
                />
              );
            }}
          />
          <Route exact path="/login" render={(props) => {
            return (authorizationStatus === AuthorizationStatus.AUTH) ?
              props.history.goBack() :
              <SignInWrapped onSubmit={login} />;
          }} />
          <Route exact path="/films/:id" render={(props) => {
            const chosenFilm = movies.find((item) => item.id === props.match.params.id);
            return chosenFilm && (
              <MoviePageWrapped
                authorizationStatus={authorizationStatus}
                film={chosenFilm}
                movies={movies}
                onMovieCardClick={this._onMovieClick}
                onFilmFavoriteStatusClick={changeFavoriteStatus}
              />
            );
          }} />
          <Route exact path="/player/:id" render={(props) => {
            const chosenFilm = movies.find((item) => item.id === props.match.params.id);
            return chosenFilm && <VideoPlayerFull
              film={chosenFilm}
              onItemLeaveHandler={onItemLeave}
            />;
          }} />
          <PrivateRoute
            exact
            path="/films/:id/review"
            render={(props) => {
              const chosenFilm = movies.find((item) => item.id === props.match.params.id);
              return chosenFilm && (
                <AddReview
                  onSubmit={sendComment}
                  film={chosenFilm}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  onItemEnter: PropTypes.func,
  onItemLeave: PropTypes.func,

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
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  sendComment(authData, filmId) {
    dispatch(CommentsOperation.sendComment(authData, filmId));
  },
  changeFavoriteStatus(filmId, status) {
    dispatch(DataOperation.changeFavoriteStatus(filmId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

