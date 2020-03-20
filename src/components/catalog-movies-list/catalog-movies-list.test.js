import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMoviesList from './catalog-movies-list.jsx';
import {Provider} from 'react-redux';
import configureStore from "redux-mock-store";
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

import {films} from '../../mocks/films.js';

const mockStore = configureStore([]);

const CatalogMoviesListWrapped = withActiveItem(CatalogMoviesList);

it(`CatalogMoviesList should render correctly`, () => {
  const store = mockStore({
    films,
    moviesByGenre: films,
    showedMovies: films,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CatalogMoviesListWrapped
            onMovieHover={() => {}}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
