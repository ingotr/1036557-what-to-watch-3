import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

const STARRING_PREMAX_EL = 2;
const STARRING_MAX_EL = 3;

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
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {genre, year, runtime, score, level, count, director, description, starring, reviews} = this.props;
    const {hours, minutes} = runtime;

    const newStarringArr = starring.slice(0, STARRING_PREMAX_EL);
    const starrringMaxEl = starring.slice(STARRING_PREMAX_EL, STARRING_MAX_EL);
    const starringString = newStarringArr.join(`, `).concat(starrringMaxEl);

    const returnDescriptionList = () => {
      for (const key of description) {
        return (
          <Fragment>
            <p>{description[key]}</p><br />
          </Fragment>
        );
      }
      return ``;
    };

    const returnStarringList = () => {
      for (const key of starring) {
        return (
          <Fragment>
            {starring[key]} <br />
          </Fragment>
        );
      }
      return ``;
    };

    const returnReviewList = () => {
      for (const key of reviews) {

        return (
          <Fragment>
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{reviews[key].text}</p>

                <footer className="review__details">
                  <cite className="review__author">{reviews[key].author}</cite>
                  <time className="review__date" dateTime={reviews[key].dateTime.string}>
                    {reviews[key].dateTime.month} {reviews[key].dateTime.day}, {reviews[key].dateTime.reviewYear}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{reviews[key].rating}</div>
            </div>
            <br />
          </Fragment>
        );
      }
      return ``;
    };

    return (
      <Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li
              onClick={this.setState({currentTab: TABS.OVERVIEW})}
              className="movie-nav__item movie-nav__item--active">
              <a href="#" className="movie-nav__link">Overview</a>
            </li>
            <li
              onClick={this.setState({currentTab: TABS.DETAILS})}
              className="movie-nav__item">
              <a href="#" className="movie-nav__link">Details</a>
            </li>
            <li
              onClick={this.setState({currentTab: TABS.REVIEWS})}
              className="movie-nav__item">
              <a href="#" className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>

        <div className="movie-rating movie-tab movie-tab--overview">
          <div className="movie-rating__score">{score}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{level}</span>
            <span className="movie-rating__count">{count}</span>
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

          <div className="movie-card__text-col movie-tab movie-tab--details visually-hidden">
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
            {returnReviewList()}
          </div>
        </div>
      </Fragment>
    );
  }

  componentDidUpdate() {
    const tabsElements = document.querySelector(`.movie-tab`);
    const tabOverviewElement = tabsElements.querySelector(`.movie-tab--overview`);
    const tabDetailsElement = tabsElements.querySelector(`.movie-tab--details`);
    const tabReviewsElement = tabsElements.querySelector(`.movie-tab--reviews`);

    switch (this.state.currentTab) {
      case TABS.OVERVIEW:
        tabsElements.classList.toggle(`visually-hidden`);
        tabOverviewElement.classList.remove(`visually-hidden`);
        break;
      case TABS.DETAILS:
        tabsElements.classList.toggle(`visually-hidden`);
        tabDetailsElement.classList.remove(`visually-hidden`);
        break;
      case TABS.REVIEWS:
        tabsElements.classList.toggle(`visually-hidden`);
        tabReviewsElement.classList.remove(`visually-hidden`);
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
