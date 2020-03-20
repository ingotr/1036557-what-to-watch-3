import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const MoviePageWrapped = withActiveItem(MoviePage);
const MainWrapped = withActiveItem(Main);

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
    const {movies, film} = this.props;
    const {showMovieInfo} = this.state;

    if (!showMovieInfo) {
      return (
        <MainWrapped
          film={film}
          movies={movies}
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
    const {film, movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/dev-film">
            <MainWrapped
              movies={movies}
              film={film}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        previewSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runtime: PropTypes.shape({
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
    }),
    poster: PropTypes.shape({
      big: PropTypes.string.isRequired,
      bigAlt: PropTypes.string.isRequired,
    }),
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
    previewSrc: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
};

export default App;
