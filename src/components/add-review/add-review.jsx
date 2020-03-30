import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/review/review.js';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getText, getSendStatus, getFormBlock, getRating} from '../../reducer/review/selectors.js';
import {getAuthorizationStatus, getAvatarUrl} from '../../reducer/user/selectors.js';

const MESSAGE_LIMIT = {
  min: 50,
  max: 400
};

const DEFAULT_RATING = 5;
const DEFAULT_RATING_FACTOR = 2;

class AddReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: DEFAULT_RATING,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  handleRatingChange(e) {
    this.props.changeRating(e.target.value);
  }

  handleChange(e) {
    switch (true) {
      case e.target.value.length < MESSAGE_LIMIT.min:
        this.props.changeSendStatusText(`Ваше сообщение менее ${MESSAGE_LIMIT.min} символов`);
        break;
      case e.target.value.length > MESSAGE_LIMIT.max:
        this.props.changeSendStatusText(`Ваше сообщение больше ${MESSAGE_LIMIT.max} символов`);
        break;
      default:
        this.props.changeSendStatusText(``);
    }

    this.props.updateNewCommentText(e.target.value);
  }

  handleSubmit(evt) {
    const {onSubmit, film} = this.props;

    evt.preventDefault();

    onSubmit({
      text: this.props.textValue,
      rating: this.props.rating * DEFAULT_RATING_FACTOR,
    }, film);
  }

  render() {
    const {authorizationStatus, avatarUrl} = this.props;
    const postDisabled = this.props.textValue.length < MESSAGE_LIMIT.min || this.props.textValue.length > MESSAGE_LIMIT.max;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={this.props.film.cover} alt={this.props.film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href={`/films/${this.props.film.id}`} className="breadcrumbs__link">{this.props.film.name}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            {
              (authorizationStatus === AuthorizationStatus.AUTH) ?
                (<div className="user-block">
                  <div className="user-block__avatar">
                    <img
                      src={avatarUrl}
                      alt="User avatar"
                      width="63"
                      height="63"
                    />
                  </div>
                </div>) : (
                  <div className="user-block"><NavLink to="/auth-dev">Sign In</NavLink></div>
                )
            }

          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={this.props.film.poster} alt={this.props.film.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                value={this.props.textValue}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <div className="add-review__submit">
                <div style={{margin: `0 auto`}}>{this.props.sendStatusValue}</div>
                {postDisabled || this.props.formBlock ? <button className="add-review__btn" type="submit" disabled>Post</button> : <button className="add-review__btn" type="submit">Post</button>}
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,

  changeRating: PropTypes.func.isRequired,
  changeSendStatusText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filmId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  updateNewCommentText: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  sendStatusValue: PropTypes.string.isRequired,
  formBlock: PropTypes.bool.isRequired,

  film: PropTypes.shape({
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
          text: PropTypes.string,
          author: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }).isRequired,

          date: PropTypes.string,
          rating: PropTypes.number,
        })
    ),
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatarUrl(state),
  textValue: getText(state),
  sendStatusValue: getSendStatus(state),
  formBlock: getFormBlock(state),
  rating: getRating(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewCommentText: (text) => {
      dispatch(ActionCreator.updateNewCommentText(text));
    },
    changeSendStatusText: (text) => {
      dispatch(ActionCreator.changeSendStatusText(text));
    },
    changeRating: (rating) => {
      dispatch(ActionCreator.changeRating(rating));
    }
  };
};

export {AddReview};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
