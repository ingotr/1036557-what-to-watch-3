import {reducer, ActionType} from './reducer.js';
import {films} from './mocks/films.js';

const DEFAULT_MOVIES_COUNT = 8;
const SHOWED_MORE_MOVIES_COUNT = 16;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    moviesByGenre: films,
    showedMovies: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: DEFAULT_MOVIES_COUNT,
  });
});

it(`Reducer should set current genre by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.SET_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    genre: `All genres`,
    movies: films,
  });

  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.SET_GENRE,
    payload: null,
  })).toEqual({
    currentGenre: null,
    genre: `All genres`,
    movies: films,
  });
});

it(`Reducer should get movies by a given genre`, () => {
  expect(reducer({
    genre: `Drama`,
    movies: films,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: films.filter((movie) => movie.genre === `Drama`),
  })).toEqual({
    genre: `Drama`,
    movies: films,
    moviesByGenre: films.filter((movie) => movie.genre === `Drama`),
  });

  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: [],
  })).toEqual({
    genre: `All genres`,
    movies: films,
    moviesByGenre: [],
  });
});

it(`Reducer should show more films`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: films,
    moviesByGenre: films,
    showedMovies: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: DEFAULT_MOVIES_COUNT,
  }, {
    type: ActionType.SHOW_MORE_MOVIES,
    payload: DEFAULT_MOVIES_COUNT,
  })).toEqual({
    genre: `All genres`,
    movies: films,
    moviesByGenre: films,
    showedMovies: films.slice(0, SHOWED_MORE_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  });
});

it(`Reducer should reset films count`, () => {
  expect(reducer({
    genre: `NewGenre`,
    movies: films,
    moviesByGenre: films,
    showedMovies: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  }, {
    type: ActionType.RESET_MOVIES_COUNT,
  })).toEqual({
    genre: `NewGenre`,
    movies: films,
    moviesByGenre: films,
    showedMovies: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: 0,
  });
});
