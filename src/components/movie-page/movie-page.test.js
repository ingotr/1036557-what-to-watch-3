import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';

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
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      avatarUrl: ``
    }
  });

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <MoviePage
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              avatarUrl=""
              film={film}
              movies={movies}
              onMovieCardClick={() => { }}
              onItemEnter={() => { }}
              onItemLeave={() => { }}
              onFilmFavoriteStatusClick={() => { }}
            />
          </Provider>
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
