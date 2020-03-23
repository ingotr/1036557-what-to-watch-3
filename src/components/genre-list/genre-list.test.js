import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

import {movies} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const GenreListWrapperd = withActiveItem(GenreList);

const store = mockStore({
  [NameSpace.DATA]: {
    currentGenre: DEFAULT_GENRE,
    movies,
  }
});

it(`Render App`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <GenreListWrapperd />
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
