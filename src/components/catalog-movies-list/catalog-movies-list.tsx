import * as React from 'react'
import {connect} from 'react-redux';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {getMoviesCount, getMoviesByGenre} from '../../reducer/data/selectors';
import {MovieInterface} from '../../types';

interface Props {
  movies: MovieInterface[];
  moviesCount: number;
  onMovieCardClick: () => void;
  onItemEnter: () => void;
  onItemLeave: () => void;
}

class CatalogMoviesList extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, moviesCount, onMovieCardClick, onItemEnter, onItemLeave} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.slice(0, moviesCount).map((movie) => (
          <SmallMovieCard
            movie={movie}
            key={movie.id}
            onMovieCardClick={onMovieCardClick}
            onMovieHover={onItemEnter}
            onMovieLeave={onItemLeave}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
  moviesCount: getMoviesCount(state),
});

export {CatalogMoviesList};

export default connect(mapStateToProps)(CatalogMoviesList);
