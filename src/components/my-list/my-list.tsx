import * as React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {getMyListMovies} from '../../reducer/data/selectors';
import {getAvatarUrl} from '../../reducer/user/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';
import {MovieInterface} from '../../types';

interface Props {
  activeItem: MovieInterface | null;
  avatarUrl: string;
  onMovieFavoriteStatusClick: () => void;
  onMovieCardClick: () => void;
  onItemEnter: () => void;
  onItemLeave: () => void;
  getMyListMovies: () => void;
  movies: MovieInterface[];
}


class MyList extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMyListMovies();
  }

  render() {
    const {movies, onMovieCardClick,
      onItemEnter, onItemLeave, avatarUrl} = this.props;
    return movies && (
      <>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <h1 className="page-title user-page__title">My list</h1>

            <div className="user-block">
              <Link to="/mylist">
                <div className="user-block__avatar">
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </Link>
            </div>
          </header>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <div className="catalog__movies-list">
              {movies.map((movie) => (
                <SmallMovieCard
                  movie={movie}
                  key={movie.id}
                  onMovieCardClick={onMovieCardClick}
                  onMovieHover={onItemEnter}
                  onMovieLeave={onItemLeave}
                />
              ))}
            </div>

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  avatarUrl: getAvatarUrl(state),
  movies: getMyListMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMyListMovies() {
    dispatch(DataOperation.loadMyListMovies());
  }
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
