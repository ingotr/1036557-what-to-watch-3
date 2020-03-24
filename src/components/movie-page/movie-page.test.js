import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

import {movies, film} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      currentGenre: DEFAULT_GENRE,
      moviesByGenre: movies.slice(0, DEFAULT_MOVIES_COUNT),
      showedMovies: movies,
      moviesCount: DEFAULT_MOVIES_COUNT,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage
            film={film}
            movies={movies}
            onMovieHover={() => { }}
            onItemEnter={() => { }}
            onItemLeave={() => { }}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
