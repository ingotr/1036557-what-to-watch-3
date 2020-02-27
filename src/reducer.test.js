import {reducer, ActionCreator, ActionType} from './reducer.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
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
    genre: `NewGenre`,
    movies: [],
  });

  expect(reducer({
    genre: `All genres`,
    movies: [],
  }, {
    type: ActionType.SET_GENRE,
    payload: null,
  })).toEqual({
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
    genre: `NewGenre`,
    movies: [].filter((movie) => movie.genre === `NewGenre`),
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
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set genre correct action`, (genre) => {
    expect(ActionCreator.setGenre(genre)).toEqual({
      type: ActionType.SET_GENRE,
      payload: genre,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for getMoviesByGenre correct action`, (movies, genre) => {
    expect(ActionCreator.getMoviesByGenre(movies, genre)).toEqual({
      type: ActionType.SET_GENRE,
      payload: genre,
    });
  });
});
