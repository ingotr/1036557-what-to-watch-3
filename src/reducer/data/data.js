import {extend} from '../../utils.js';
import adapter from './adapter.js';
import {commentsAdapter} from "./adapter.js";

const DEFAULT_MOVIES_COUNT = 8;

const initialState = {
  movie: {},
  movies: [],
  currentGenre: `All genres`,
  moviesByGenre: [],
  showedMovies: [],
  moviesCount: DEFAULT_MOVIES_COUNT,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SHOW_MORE_MOVIES: `SHOW_MORE_MOVIES`,
  CHANGE_MOVIES_COUNT: `CHANGE_MOVIES_COUNT`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  getMoviesByGenre: (genre) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: genre,
  }),

  showMoreMovies: () => ({
    type: ActionType.SHOW_MORE_MOVIES,
    payload: DEFAULT_MOVIES_COUNT,
  }),

  changeMoviesCount: (movieCount) => {
    return {
      type: ActionType.CHANGE_MOVIES_COUNT,
      payload: movieCount,
    };
  },

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadPromoMovie: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    };
  },

  changeFavoriteStatus: (movieId) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: movieId,
    };
  },
};

const loadComments = (item) => (dispatch, getState, api) => {
  return api.get(`/comments/${item.id}`)
    .then((response) => {
      item.reviews = response.data.map((review) => commentsAdapter(review));
    });
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const adaptedData = response.data.map((item) => {
          const adaptedItem = adapter(item);
          dispatch(loadComments(adaptedItem));
          return adaptedItem;
        });
        dispatch(ActionCreator.loadMovies(adaptedData));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        return adapter(response.data);
      })
      .then((movie) => {
        dispatch(loadComments(movie));
        return movie;
      })
      .then((movie) => {
        dispatch(ActionCreator.loadPromoMovie(movie));
      });
  },
  changeFavoriteStatus: (movieId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/${status}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.changeFavoriteStatus(movieId));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_MOVIES_BY_GENRE:
      const {movies} = state;
      const genre = action.payload;

      if (genre === `All genres`) {
        return extend(state, {
          moviesByGenre: movies
        });
      }

      return extend(state, {
        moviesByGenre: movies.filter((movie) => movie.genre === genre),
      });

    case ActionType.SHOW_MORE_MOVIES:
      const moviesCount = state.moviesCount + action.payload;
      return extend(state, {
        moviesCount,
        showedMovies: state.moviesByGenre.slice(0, moviesCount),
      });

    case ActionType.CHANGE_MOVIES_COUNT:
      return extend(state, {
        moviesCount: action.payload,
      });

    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
        moviesByGenre: action.payload,
        showedMovies: action.payload.slice(0, state.moviesCount),
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        movie: action.payload,
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      const changedMoviesList = state.movies.map((movie) => {
        if (movie.id === action.payload) {
          movie.favorite = !movie.favorite;
        } return movie;
      });
      let movieCurrent;
      if (state.genre === `All genres`) {
        movieCurrent = state.movies;
      } else {
        movieCurrent = state.movies.filter((movie) => movie.genre === state.genre);
      }
      const showedMovies = movieCurrent.slice(0, state.moviesCount);
      const promoMovie = state.movie.id === action.payload ? extend(state, extend(state.movie, {favorite: !state.movie.favorite})) : state.movie;
      return extend(state, {
        movies: changedMoviesList,
        movieCurrent,
        showedMovies,
        movie: promoMovie,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
