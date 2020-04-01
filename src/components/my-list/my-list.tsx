import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SmallMovieCard from '../small-movie-card/small-movie-card.jsx';
import {getMyListMovies} from '../../reducer/data/selectors.js';
import {getAvatarUrl} from '../../reducer/user/selectors';
import {Operation as DataOperation} from '../../reducer/data/data.js';

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loading();
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
                  film={movie}
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
MyList.propTypes = {
  avatarUrl: PropTypes.string.isRequired,

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
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
              rating: PropTypes.number.isRequired,
              date: PropTypes.string.isRequired,
              author: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
              }).isRequired,
              text: PropTypes.string.isRequired,
            })),
      })),

  onFilmFavoriteStatusClick: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onItemEnter: PropTypes.func,
  onItemLeave: PropTypes.func,
  loading: PropTypes.func,
  activeItem: PropTypes.any,
};

const mapStateToProps = (state) => ({
  avatarUrl: getAvatarUrl(state),
  movies: getMyListMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  loading() {
    dispatch(DataOperation.loadMyListMovies());
  }
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
