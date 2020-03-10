import {reducer, ActionType} from './reducer.js';
import {films} from './mocks/films.js';

const DEFAULT_MOVIES_COUNT = 8;
const SHOWED_MORE_MOVIES_COUNT = 16;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    moviesByGenre: films,
    showedMoves: films.slice(0, 8),
    moviesCount: 8,
    movies: films,
  });
});

it(`Reducer should set current genre by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.SET_GENRE,
    payload: `NewGenre`,
  })).toEqual({
    currentGenre: `NewGenre`,
    genre: `All genres`,
    movies: films,
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: 8,
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
    movies: [],
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: 8,
  });
});

it(`Reducer should get movies by a given genre`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: `NewGenre`,
  })).toEqual({
    genre: `All genres`,
    movies: films,
    moviesByGenre: `NewGenre`,
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: 8,
  });

  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: null,
  })).toEqual({
    genre: `All genres`,
    movies: [],
    moviesByGenre: null,
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: DEFAULT_MOVIES_COUNT,
  });
});

it(`Reducer should show more films`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: films,
    moviesByGenre: films,
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: DEFAULT_MOVIES_COUNT,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
    payload: 8,
  })).toEqual({
    genre: `NewGenre`,
    movies: films,
    moviesByGenre: films,
    showedMoves: films.slice(0, SHOWED_MORE_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  });
});

it(`Reducer should reset films count`, () => {
  expect(reducer({
    genre: `NewGenre`,
    movies: films,
    moviesByGenre: films,
    showedMoves: films.slice(0, DEFAULT_MOVIES_COUNT),
    moviesCount: SHOWED_MORE_MOVIES_COUNT,
  }, {
    type: ActionType.RESET_FILMS_COUNT,
  })).toEqual({
    genre: `NewGenre`,
    movies: films,
    moviesByGenre: films,
    showedMoves: films.slice(0, 8),
    moviesCount: 0,
  });
});
