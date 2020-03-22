import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {film, movies} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const mockStore = configureStore([]);

const store = mockStore({
  currentGenre: DEFAULT_GENRE,
  moviesByGenre: [],
  showedMovies: movies,
});

it(`Main component shouled render correctly`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <Main
           film={film}
           movies={movies}
           onMouseClick={() => {}}
           onMovieHover={() => {}}
           onItemEnter={() => { }}
           onItemLeave={() => { }}
         />
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});

