import * as React from 'react'
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data';
import {getCurrentGenre, getMovies} from '../../reducer/data/selectors';
import {MovieInterface} from '../../types';

const DEFAULT_GENRE = `All genres`;
const ACTIVE_GENRE_ELEMENT = `catalog__genres-item--active`;
const GENRE_LIST_MAX_LENGTH = 9;
const DEFAULT_MOVIE_COUNT = 8;

interface Props {
  currentGenre: string;
  onGenreElementClick: (genre: string) => void;
  onItemEnter: (genre: string) => void;
  movies: MovieInterface[];
}

class GenreList extends React.PureComponent<Props, {}> {

  render() {
    const {movies, onGenreElementClick, onItemEnter, currentGenre} = this.props;

    const returnCurrentGenres = () => {
      let currentGenres = [DEFAULT_GENRE];
      movies.map((movie) => {
        if (!currentGenres.includes(movie.genre)) {
          currentGenres.push(movie.genre);
        }
      });

      return currentGenres;
    };

    const genresList = returnCurrentGenres().slice(0, GENRE_LIST_MAX_LENGTH);

    const returnCurrentGenreElement = (genre) => {
      return currentGenre === genre ? ACTIVE_GENRE_ELEMENT : ``;
    };

    const returnGenresList = () => {
      const genresElements = [];
      for (const genre of genresList) {
        const genreFragment =
          <React.Fragment key={genre + genresList.indexOf(genre)}>
            <li className={`catalog__genres-item ${returnCurrentGenreElement(genre)}`}>
              <a
                href="#"
                className="catalog__genres-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  onGenreElementClick(genre);
                  onItemEnter(genre);
                }}
              >{genre}</a>
            </li>
          </React.Fragment>;
        genresElements.push(genreFragment);
      }
      return genresElements;
    };

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          {returnGenresList()}
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  currentGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreElementClick: (genre) => {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.changeMoviesCount(DEFAULT_MOVIE_COUNT));
    dispatch(ActionCreator.getMoviesByGenre(genre));
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
