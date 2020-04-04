import * as React from 'react';
import {connect} from 'react-redux';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {getMoviesCount, getMoviesByGenre} from '../../reducer/data/selectors';
import {MovieInterface} from '../../types';
import {getSameGenreMovies} from './helpers/helpers';

interface Props {
  ifSameGenre: boolean;
  getSameGenreMovies: () => void;
  movie: MovieInterface;
  movies: MovieInterface[];
  moviesCount: number;
  onMovieCardClick: () => void;
  onItemEnter: () => void;
  onItemLeave: () => void;
}

const CatalogMoviesList: React.FunctionComponent<Props> = (Props) => {
  const {movie, movies, moviesCount, onMovieCardClick, onItemEnter, onItemLeave, ifSameGenre} = Props;

  let moviesList = movies;

  if (ifSameGenre) {
    const sameGenreMovies = getSameGenreMovies(movie, movies);
    moviesList = sameGenreMovies;
  }

  return (
    <div className="catalog__movies-list">
      {moviesList.slice(0, moviesCount).map((item) => (
        <SmallMovieCard
          movie={item}
          key={item.id}
          onMovieCardClick={onMovieCardClick}
          onMovieHover={onItemEnter}
          onMovieLeave={onItemLeave}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  moviesCount: getMoviesCount(state),
});

export {CatalogMoviesList};

export default connect(mapStateToProps)(CatalogMoviesList);
