import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreList from './genre-list.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {movies} from '../../mocks/test-mocks.js';

Enzyme.configure({
  adapter: new Adapter(),
});

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const store = mockStore({
  currentGenre: DEFAULT_GENRE,
});

it(`Should genreList item be pressed`, () => {
  const onGenreListClick = jest.fn();

  const GenreListElement = shallow(
      <Provider store={store}>
        <GenreList
          movies={movies}
        />
      </Provider>
  );

  const genreItems = GenreListElement.find(`.catalog__genres-item`);
  genreItems.forEach((node) => {
    node.simulate(`onClick`, onGenreListClick({target: false}));
  });

  expect(GenreListElement.length).toBe(5);

  expect(onGenreListClick.mock.calls.length).toBe(5);
});
