import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {movies, movieInfo} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const store = mockStore({
  currentGenre: DEFAULT_GENRE,
  moviesByGenre: [],
  showedMovies: movies,
});

it(`Render App`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage
            movieInfo={movieInfo}
            movies={movies}

            onMovieHover={() => { }}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
