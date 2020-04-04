import {reducer, ActionType} from './data.js';
import {movies, film} from '../../mocks/test-mocks.js';

const DEFAULT_MOVIES_COUNT = 8;
const SHOWED_MORE_MOVIES_COUNT = 16;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    moviesByGenre: [],
    movie: {},
    movies: [],
    showedMovies: [],
    moviesCount: DEFAULT_MOVIES_COUNT,
    myListMovies: null,
  });
});

it(`Reducer should set current genre by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
    movies,
    movie: film,
  }, {
    type: ActionType.SET_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    genre: `All genres`,
    movies,
    movie: film,
  });

  expect(reducer({
    genre: `All genres`,
    movies,
    movie: film,
  }, {
    type: ActionType.SET_GENRE,
    payload: null,
  })).toEqual({
    currentGenre: null,
    genre: `All genres`,
    movies,
    movie: film,
  });
});

it(`Reducer should get movies by a given genre`, () => {
  expect(reducer({
    genre: `Drama`,
    movies,
    movie: film,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    genre: `Drama`,
    movies,
    movie: film,
    moviesByGenre: movies.filter((movie) => movie.genre === `Drama`),
  });

  expect(reducer({
    genre: `All genres`,
    movies,
    movie: film,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: [],
  })).toEqual({
    genre: `All genres`,
    movies,
    movie: film,
    moviesByGenre: [],
  });
});

it(`Reducer should show more movies`, () => {
  expect(reducer({
    genre: `All genres`,
    movies,
    movie: film,
    moviesByGenre: movies,
    showedMovies: movies.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: DEFAULT_MOVIES_COUNT,
  }, {
    type: ActionType.SHOW_MORE_MOVIES,
    payload: DEFAULT_MOVIES_COUNT,
  })).toEqual({
    genre: `All genres`,
    movies,
    movie: film,
    moviesByGenre: movies,
    showedMovies: movies.slice(0, SHOWED_MORE_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  });
});

it(`Reducer should change movies count`, () => {
  expect(reducer({
    genre: `NewGenre`,
    movies,
    movie: film,
    moviesByGenre: movies,
    showedMovies: movies.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  }, {
    type: ActionType.CHANGE_MOVIES_COUNT,
    payload: 0,
  })).toEqual({
    genre: `NewGenre`,
    movies,
    movie: film,
    moviesByGenre: movies,
    showedMovies: movies.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: 0,
  });
});

it(`Reducer should change film list`, () => {
  expect(reducer({
    movies: [],
    genre: `All genres`,
    moviesCount: 8,
    movie: film,
    myListMovies: null,
    moviesByGenre: [],
    showedMovies: movies.slice(0, DEFAULT_MOVIES_COUNT),
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
    genre: `All genres`,
    moviesCount: 8,
    movie: film,
    myListMovies: null,
    moviesByGenre: movies,
    showedMovies: movies.slice(0, DEFAULT_MOVIES_COUNT),
  });
});

it(`Reducer should change promo film`, () => {
  expect(reducer({
    movies,
    genre: `All genres`,
    moviesCount: 8,
    movie: [],
    myListMovies: null,
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: film,
  })).toEqual({
    movies,
    genre: `All genres`,
    moviesCount: 8,
    movie: film,
    myListMovies: null,
  });
});

it(`Reducer should load MyList`, () => {
  expect(reducer({
    movies,
    genre: `Documentary`,
    moviesCount: 8,
    movie: film,
    myListMovies: null,
  }, {
    type: ActionType.LOAD_MY_LIST_MOVIES,
    payload: movies.slice(0, 2),
  })).toEqual({
    movies,
    genre: `Documentary`,
    moviesCount: 8,
    movie: film,
    myListMovies: movies.slice(0, 2),
  });
});

it(`Reducer should change status of current film`, () => {
  expect(reducer({
    movies,
    genre: `Documentary`,
    moviesCount: 8,
    movie: film,
    isFavorite: film.favorite,
    myListMovies: null,
    movieCurrent: [],
    showedMovies: [],
  }, {
    type: ActionType.CHANGE_FAVORITE_STATUS,
    payload: 1,
  })).toEqual({
    movies,
    genre: `Documentary`,
    moviesCount: 8,
    movie: film,
    isFavorite: film.favorite,
    myListMovies: null,
    movieCurrent: [],
    showedMovies: [],
  });
});

