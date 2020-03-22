import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';

import {FirstMovie, movies, film} from '../../mocks/test-mocks.js';

const mockStore = configureStore([]);

const DEFAULT_GENRE = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

const store = mockStore({
  [NameSpace.DATA]: {
    currentGenre: DEFAULT_GENRE,
    movies,
    moviesByGenre: movies,
    showedMovies: movies,
    moviesCount: DEFAULT_MOVIES_COUNT,
  }
});

it(`Render App`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <App
        title={FirstMovie.TITLE}
        genre={FirstMovie.GENRE}
        releaseDate={FirstMovie.RELEASE_DATE}
        movies={movies}
        film={film}
      />
    </Provider>, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

