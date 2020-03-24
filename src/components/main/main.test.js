import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user.js";

import {film, movies} from '../../mocks/test-mocks.js';

const DEFAULT_GENRE = `All genres`;
const DEFAULT_MOVIES_COUNT = 8;

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    currentGenre: DEFAULT_GENRE,
    movies,
    moviesByGenre: movies,
    showedMovies: movies,
    moviesCount: DEFAULT_MOVIES_COUNT,
  }
});


it(`Main component should render correctly`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <BrowserRouter >
           <Main
             authorizationStatus={AuthorizationStatus.NO_AUTH}
             film={film}
             onMouseClick={() => {}}
             onMovieHover={() => {}}
             onItemEnter={() => { }}
             onItemLeave={() => { }}
             activeItem={null}
           />
         </BrowserRouter >
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});

