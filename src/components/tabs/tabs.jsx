import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

const STARRING_PREMAX_EL = 3;
const STARRING_MAX_EL = 4;
const REVIEW_HALFINDEX = 3;

const TABS = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

const VISUALLY_HIDDEN_CLASSNAME = `visually-hidden`;
const ACTIVE_NAV_ELEMENT = `movie-nav__item--active`;

class Tabs extends PureComponent {

  render() {
    const {genre, year, runtime, score, level, count, director, description, starring, reviews,
      activeItem, onItemEnter} = this.props;
    const {hours, minutes} = runtime;

    const newStarringArr = starring.slice(0, STARRING_PREMAX_EL);
    const starrringMaxEl = starring.slice(STARRING_PREMAX_EL, STARRING_MAX_EL);
    const starringString = newStarringArr.join(`, `).concat(`, `, starrringMaxEl);

    const returnDescriptionList = () => {
      const descriptionList = [];
      for (const key of description) {
        const descriptionFragment =
          <Fragment key={key + description.indexOf(key)}>
            <p>{key}</p>
          </Fragment>;
        descriptionList.push(descriptionFragment);
      }
      return descriptionList;
    };

    const returnStarringList = () => {
      const resultFragment = starring.join(`, \n`);

      return resultFragment;
    };

    const returnReviewList = () => {
      const reviewFragmentArr = [];

      for (const review of reviews) {
        const currentFragment = <Fragment key={review + reviews.indexOf(review)}>
          <div className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.text}</p>

              <footer className="review__details">
                <cite className="review__author">{review.author}</cite>
                <time className="review__date" dateTime={review.dateTime.string}>
                  {review.dateTime.month} {review.dateTime.day}, {review.dateTime.reviewYear}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
          <br />
        </Fragment>;
        reviewFragmentArr.push(currentFragment);
      }
      return reviewFragmentArr;
    };

    const returnCurrentNavElement = (typeOfTab) => {
      return activeItem === typeOfTab ? ACTIVE_NAV_ELEMENT : ``;
    };

    const returnCurrentTabsElements = (typeOfTab) => {
      return activeItem === typeOfTab ? `` : VISUALLY_HIDDEN_CLASSNAME;
    };

    return (
      <Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              onClick={() => onItemEnter({activeItem: TABS.OVERVIEW})}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.OVERVIEW)}`}>
              <a href="#" className="movie-nav__link">Overview</a>
            </li>
            <li
              onClick={() => onItemEnter({activeItem: TABS.DETAILS})}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.DETAILS)}`}>
              <a href="#" className="movie-nav__link">Details</a>
            </li>
            <li
              onClick={() => onItemEnter({activeItem: TABS.REVIEWS})}
              className={`movie-nav__item ${returnCurrentNavElement(TABS.REVIEWS)}`}>
              <a href="#" className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        <div className={`movie-rating movie-tab movie-tab--overview
        ${returnCurrentTabsElements(TABS.OVERVIEW)}`}>
          <div className="movie-rating__score">{score}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{level}</span>
            <span className="movie-rating__count">{count} ratings</span>
          </p>
        </div>

        <div className={`movie-card__text movie-tab movie-tab--overview
        ${returnCurrentTabsElements(TABS.OVERVIEW)}`}>
          {returnDescriptionList()}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starringString} and other</strong></p>
        </div>

        <div className={`movie-card__text movie-card__row movie-tab movie-tab--details
        ${returnCurrentTabsElements(TABS.DETAILS)}`}>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {returnStarringList()}
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
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{year}</span>
            </p>
          </div>
        </div>

        <div className={`movie-card__reviews movie-card__row movie-tab movie-tab--reviews
        ${returnCurrentTabsElements(TABS.REVIEWS)}`}>
          <div className="movie-card__reviews-col">
            {returnReviewList().slice(0, REVIEW_HALFINDEX)}
          </div>
          <div className="movie-card__reviews-col">
            {returnReviewList().slice(REVIEW_HALFINDEX)}
          </div>
        </div>
      </Fragment>
    );
  }
}

Tabs.propTypes = {
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,

  runtime: PropTypes.shape({
    hours: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
  }).isRequired,

  score: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,

  director: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,

        dateTime: PropTypes.shape({
          string: PropTypes.string.isRequired,
          reviewYear: PropTypes.number.isRequired,
          month: PropTypes.string.isRequired,
          day: PropTypes.number.isRequired,
        }).isRequired,

        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,

  activeItem: PropTypes.string.isRequired,
  onItemEnter: PropTypes.func.isRequired,
};

export default Tabs;
