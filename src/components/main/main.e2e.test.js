import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {FirstMovie, movies} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const store = mockStore({
  moviesByGenre: [],
});

it(`Should movie title be pressed`, () => {
  const onMovieTitleClick = jest.fn();
  const onMovieMouseHover = jest.fn();
  const main = shallow(
      <Provider store={store}>
        <Main
          title={FirstMovie.TITLE}
          genre={FirstMovie.GENRE}
          releaseDate={FirstMovie.RELEASE_DATE}
          movies={movies}
          onMouseClick={onMovieTitleClick}
          onMovieHover={onMovieMouseHover}
        />
      </Provider>
  );

  const movieTitle = main.find(`movie-card__title`);

  expect(movieTitle.length).toBe(1);

  movieTitle.props().onClick();

  expect(onMovieTitleClick.mock.calls.length).toBe(1);
});

it(`Should movie poster be pressed`, () => {
  const onMoviePosterClick = jest.fn();
  const onMovieMouseHover = jest.fn();
  const main = shallow(
      <Provider store={store}>
        <Main
          title={FirstMovie.TITLE}
          genre={FirstMovie.GENRE}
          releaseDate={FirstMovie.RELEASE_DATE}
          movies={movies}
          onMouseClick={onMoviePosterClick}
          onMovieHover={onMovieMouseHover}
        />
      </Provider>
  );

  const moviePoster = main.find(`movie-card__poster`);

  expect(moviePoster.length).toBe(1);

  moviePoster.props().onClick();

  expect(onMoviePosterClick.mock.calls.length).toBe(1);
});
