import {reducer, ActionType} from './reducer.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: `All genres`,
    moviesByGenre: [],
  });
});

it(`Reducer should set current genre by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: [],
  }, {
    type: ActionType.SET_GENRE,
    payload: `NewGenre`,
  })).toEqual({
    currentGenre: `NewGenre`,
    genre: `All genres`,
    movies: [],
  });

  expect(reducer({
    genre: `All genres`,
    movies: [],
  }, {
    type: ActionType.SET_GENRE,
    payload: null,
  })).toEqual({
    currentGenre: null,
    genre: `All genres`,
    movies: [],
  });
});

it(`Reducer should get movies by a given genre`, () => {
  expect(reducer({
    genre: `All genres`,
    movies: [],
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: `NewGenre`,
  })).toEqual({
    genre: `All genres`,
    movies: [],
    moviesByGenre: `NewGenre`,
  });

  expect(reducer({
    genre: `All genres`,
    movies: [],
  }, {
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: null,
  })).toEqual({
    genre: `All genres`,
    movies: [],
    moviesByGenre: null,
  });
});
