import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space.js';

import {movies} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    currentGenre: DEFAULT_GENRE,
  }
});

it(`Render App`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <GenreList
           movies={movies}
         />
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
