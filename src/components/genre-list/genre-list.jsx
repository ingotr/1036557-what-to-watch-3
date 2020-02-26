import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

const DEFAULT_GENRE = `All genres`;
const ACTIVE_GENRE_ELEMENT = `catalog__genres-item--active`;
const GENRE_LIST_MAX_LENGTH = 9;

class GenreList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentGenre: DEFAULT_GENRE,
    };
  }

  render() {
    const {movies} = this.props;

    const returnCurrentGenres = () => {
      let currentGenres = [DEFAULT_GENRE];
      for (const movie of movies) {
        if (!currentGenres.includes(movie.genre)) {
          currentGenres.push(movie.genre);
        }
      }

      return currentGenres;
    };

    const genresList = returnCurrentGenres().slice(0, GENRE_LIST_MAX_LENGTH);

    const returnCurrentGenreElement = (genre) => {
      return this.state.currentGenre === genre ? ACTIVE_GENRE_ELEMENT : ``;
    };

    const returnGenresList = (genres) => {
      const genresElements = [];
      for (const genre of genres) {
        const genreFragment =
          <Fragment key={genre + genres.indexOf(genre)}>
            <li
              onClick={() => {
                this.setState({currentGenre: genre});
              }}
              className={`catalog__genres-item ${returnCurrentGenreElement(genre)}`}>
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          </Fragment>;
        genresElements.push(genreFragment);
      }
      return genresElements;
    };

    return (
      <Fragment>
        <ul className="catalog__genres-list">
          {returnGenresList(genresList)}
        </ul>
      </Fragment>
    );
  }
}

GenreList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        previewSrc: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default GenreList;
