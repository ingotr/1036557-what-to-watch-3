import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMoviesList from './catalog-movies-list.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {films} from '../../mocks/films.js';

const mockStore = configureStore([]);

it(`CatalogMoviesList should render correctly`, () => {
  const store = mockStore({
    films,
    moviesByGenre: films,
    showedMovies: films,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <CatalogMoviesList
            onMovieHover={() => {}}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
