import * as React from 'react'
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {getPromoMovie, getMoviesByGenre} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user';
import {Operation as CommentsOperation} from '../../reducer/review/review';
import {Operation as DataOperation} from '../../reducer/data/data';
import SignIn from '../sign-in/sign-in';
import VideoPlayerFull from '../../components/video-player-full/video-player-full';
import AddReview from '../../components/add-review/add-review';
import withErrorsItem from '../../hocs/with-errors-item/with-errors-item';
import history from '../../history';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';
import {MovieInterface} from '../../types';

const MoviePageWrapped = withActiveItem(MoviePage);
const MainWrapped = withActiveItem(Main);
const SignInWrapped = withErrorsItem(SignIn);
const MyListWrapped = withActiveItem(MyList);

interface Props {
  authorizationStatus: string;
  changeFavoriteStatus: () => void;
  sendComment: () => void;
  login: () => void;
  movie: MovieInterface;
  movies: MovieInterface[];
  loading: () => void;
  pending: boolean;
  onItemLeave: () => void;
  onItemEnter: (movie: MovieInterface) => void;
}

class App extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._onMovieClick = this._onMovieClick.bind(this);
  }

  _onMovieClick(movie) {
    this.props.onItemEnter(movie);
    history.push(`/films/${movie.id}`);
  }

  render() {
    const {movies, movie, authorizationStatus, changeFavoriteStatus,
      login, sendComment, onItemLeave} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <MainWrapped
              authorizationStatus={authorizationStatus}
              movie={movie}
              onMovieCardClick={this._onMovieClick}
              onMovieFavoriteStatusClick={changeFavoriteStatus}
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
                  onMovieFavoriteStatusClick={changeFavoriteStatus}
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
                movie={chosenFilm}
                movies={movies}
                onMovieCardClick={this._onMovieClick}
                onMovieFavoriteStatusClick={changeFavoriteStatus}
              />
            );
          }} />
          <Route exact path="/player/:id" render={(props) => {
            const chosenFilm = movies.find((item) => item.id === props.match.params.id);
            return chosenFilm && <VideoPlayerFull
              movie={chosenFilm}
              onItemLeave={onItemLeave}
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
                  movie={chosenFilm}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMoviesByGenre(state),
  movie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  sendComment(authData, movieId) {
    dispatch(CommentsOperation.sendComment(authData, movieId));
  },
  changeFavoriteStatus(movieId, status) {
    dispatch(DataOperation.changeFavoriteStatus(movieId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

