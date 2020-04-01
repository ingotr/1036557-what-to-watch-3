import * as React from 'react';
import * as moment from 'moment';
import {MovieInterface} from '../../types';

const TABS = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

const VISUALLY_HIDDEN_CLASSNAME = `visually-hidden`;
const ACTIVE_NAV_ELEMENT = `movie-nav__item--active`;
const MINUTES_IN_HOUR = 60;

interface Props {
  activeItem: string;
  onItemEnter: (TABS: string) => void;
  onItemLeave: () => void;
  movie: MovieInterface;
}

class Tabs extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.props.onItemEnter(TABS.OVERVIEW);
  }

  getMovieRatingLevel(rating) {
    let level = ``;
    if ((rating >= 0) && (rating < 3)) {
      level = `Bad`;
    }
    if ((rating >= 3) && (rating < 5)) {
      level = `Normal`;
    }
    if ((rating >= 5) && (rating < 8)) {
      level = `Good`;
    }
    if ((rating >= 8) && (rating < 10)) {
      level = `Very good`;
    }
    if (rating === 10.0) {
      level = `Awesome`;
    }
    return level;
  }

  render() {
    const {activeItem, onItemEnter, movie} = this.props;
    const minutes = +movie.runtime % MINUTES_IN_HOUR;
    const hours = Math.floor(+movie.runtime / MINUTES_IN_HOUR);

    const level = this.getMovieRatingLevel(movie.rating);

    const reviewFragmentArr = movie.reviews.map((review) => (
      <React.Fragment key={review.text + movie.reviews.indexOf(review)}>
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.text}</p>

            <footer className="review__details">
              <cite className="review__author">{review.author.name}</cite>
              <time className="review__date" dateTime={review.date}>
                {moment(review.date).format(`MMMM D, YYYY`)}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
        <br />
      </React.Fragment>
    )
    );

    const returnCurrentNavElement = (typeOfTab) => {
      return activeItem === typeOfTab ? ACTIVE_NAV_ELEMENT : ``;
    };

    const returnCurrentTabsElements = (typeOfTab) => {
      return activeItem === typeOfTab ? `` : VISUALLY_HIDDEN_CLASSNAME;
    };

    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              onClick={(evt) => {
                evt.preventDefault();
                onItemEnter(TABS.OVERVIEW);
              }}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.OVERVIEW)}`}>
              <a href="#" className="movie-nav__link">Overview</a>
            </li>
            <li
              onClick={(evt) => {
                evt.preventDefault();
                onItemEnter(TABS.DETAILS);
              }}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.DETAILS)}`}>
              <a href="#" className="movie-nav__link">Details</a>
            </li>
            <li
              onClick={(evt) => {
                evt.preventDefault();
                onItemEnter(TABS.REVIEWS);
              }}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.REVIEWS)}`}>
              <a href="#" className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        <div className={`movie-rating movie-tab movie-tab--overview
        ${returnCurrentTabsElements(TABS.OVERVIEW)}`}>
          <div className="movie-rating__score">{movie.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{level}</span>
            <span className="movie-rating__count">{movie.votes} ratings</span>
          </p>
        </div>

        <div className={`movie-card__text movie-tab movie-tab--overview
        ${returnCurrentTabsElements(TABS.OVERVIEW)}`}>
          {movie.description}
          <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {movie.starring.slice(0, 4).join(`, `)} and other</strong></p>
        </div>

        <div className={`movie-card__text movie-card__row movie-tab movie-tab--details
        ${returnCurrentTabsElements(TABS.DETAILS)}`}>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{movie.director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {movie.starring.map((actor, index) => (
                  <React.Fragment key={actor + index}>
                    {actor} <br />
                  </React.Fragment>
                ))}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{hours}h {minutes}m</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{movie.genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{movie.year}</span>
            </p>
          </div>
        </div>

        <div className={`movie-card__reviews movie-card__row movie-tab movie-tab--reviews
        ${returnCurrentTabsElements(TABS.REVIEWS)}`}>
          <div className="movie-card__reviews-col">
            {reviewFragmentArr}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tabs;
