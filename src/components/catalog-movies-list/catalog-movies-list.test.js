import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMoviesList from './catalog-movies-list.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import NameSpace from '../../reducer/name-space.js';

import {movies} from '../../mocks/test-mocks.js';

const mockStore = configureStore([]);

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);

const DEFAULT_GENRE = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

it(`CatalogMoviesList should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      currentGenre: DEFAULT_GENRE,
      movies,
      moviesByGenre: movies,
      showedMovies: movies,
      moviesCount: DEFAULT_MOVIES_COUNT,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CatalogMoviesListWrapped
            onMovieHover={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
