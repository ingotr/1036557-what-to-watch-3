import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

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
    const {title, genre, releaseDate, movies, movieInfo} = this.props;
    const {showMovieInfo} = this.state;

    if (!showMovieInfo) {
      return (
        <Main
          title={title}
          genre={genre}
          releaseDate={releaseDate}
          movies={movies}
          onMouseClick={this._clickHandler.bind(this)}
          onMovieHover={movieHoverHandler}
        />
      );
    }

    if (showMovieInfo) {
      return (
        <MoviePage
          movieInfo={movieInfo}
        />
      );
    }

    return null;
  }

  render() {
    const {movieInfo} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              movieInfo={movieInfo}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
      })
  ).isRequired,

  movieInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,

    poster: PropTypes.shape({
      big: PropTypes.string.isRequired,
      bigAlt: PropTypes.string.isRequired,
    }).isRequired,

    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      level: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,

    director: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default App;
