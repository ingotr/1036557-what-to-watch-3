import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {FirstMovie, movies} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const store = mockStore({
  currentGenre: DEFAULT_GENRE,
  moviesByGenre: [],
});

it(`Render App`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <Main
           title={FirstMovie.TITLE}
           genre={FirstMovie.GENRE}
           releaseDate={FirstMovie.RELEASE_DATE}
           movies={movies}
           onMouseClick={() => {}}
           onMovieHover={() => {}}
         />
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});

