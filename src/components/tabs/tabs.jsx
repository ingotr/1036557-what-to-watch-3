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

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TABS.OVERVIEW,
    };
    this.tabsElements = [];
    this.tabOverviewElement = [];
    this.tabDetailsElement = [];
    this.tabReviewsElement = [];
  }

  componentDidMount() {
    this.tabsElements = document.querySelectorAll(`.movie-tab`);
    this.tabOverviewElement = document.querySelectorAll(`.movie-tab--overview`);
    this.tabDetailsElement = document.querySelector(`.movie-tab--details`);
    this.tabReviewsElement = document.querySelector(`.movie-tab--reviews`);
    this.navElements = document.querySelectorAll(`.movie-nav__item`);
  }

  componentWillUnmount() {

  }

  render() {
    const {genre, year, runtime, score, level, count, director, description, starring, reviews} = this.props;
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

    const selectCurrentNavElement = () => {
      for (const elem of this.navElements) {
        elem.classList.remove(`movie-nav__item--active`);
      }
      event.target.parentElement.classList.add(`movie-nav__item--active`);
    };

    return (
      <Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              onClick={() => {
                this.setState({currentTab: TABS.OVERVIEW});
                selectCurrentNavElement();
              }}
              className="movie-nav__item movie-nav__item--active">
              <a href="#" className="movie-nav__link">Overview</a>
            </li>
            <li
              onClick={() => {
                this.setState({currentTab: TABS.DETAILS});
                selectCurrentNavElement();
              }}
              className="movie-nav__item">
              <a href="#" className="movie-nav__link">Details</a>
            </li>
            <li
              onClick={() => {
                this.setState({currentTab: TABS.REVIEWS});
                selectCurrentNavElement();
              }}
              className="movie-nav__item">
              <a href="#" className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        <div className="movie-rating movie-tab movie-tab--overview">
          <div className="movie-rating__score">{score}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{level}</span>
            <span className="movie-rating__count">{count} ratings</span>
          </p>
        </div>

        <div className="movie-card__text movie-tab movie-tab--overview">
          {returnDescriptionList()}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starringString} and other</strong></p>
        </div>

        <div className="movie-card__text movie-card__row movie-tab movie-tab--details visually-hidden">
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

        <div className="movie-card__reviews movie-card__row movie-tab movie-tab--reviews visually-hidden">
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

  componentDidUpdate() {
    switch (this.state.currentTab) {
      case TABS.OVERVIEW:
        for (const elem of this.tabsElements) {
          elem.classList.add(`visually-hidden`);
        }
        for (const elem of this.tabOverviewElement) {
          elem.classList.toggle(`visually-hidden`);
        }
        break;
      case TABS.DETAILS:
        for (const elem of this.tabsElements) {
          elem.classList.add(`visually-hidden`);
        }
        this.tabDetailsElement.classList.toggle(`visually-hidden`);
        break;
      case TABS.REVIEWS:
        for (const elem of this.tabsElements) {
          elem.classList.add(`visually-hidden`);
        }
        this.tabReviewsElement.classList.toggle(`visually-hidden`);
        break;
    }
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
};

export default Tabs;
