import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CatalogMoviesList from './catalog-movies-list';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import NameSpace from '../../reducer/name-space';
import {BrowserRouter} from 'react-router-dom';
import testFunc from '../../utils';

import {movies} from '../../mocks/test-mocks';

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
        <BrowserRouter>
          <Provider store={store}>
            <CatalogMoviesListWrapped
              onMovieHover={testFunc}
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
