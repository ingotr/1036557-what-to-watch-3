import * as React from 'react';
import * as renderer from 'react-test-renderer';
import GenreList from './genre-list';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from '../../reducer/name-space';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

import {movies} from '../../mocks/test-mocks';

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
