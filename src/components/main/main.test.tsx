import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Main from './main';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import testFunc from '../../utils';

import {film, movies} from '../../mocks/test-mocks';

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
  },
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``
  }
});


it(`Main component should render correctly`, () => {
  const tree = renderer
   .create(
       <Provider store={store}>
         <BrowserRouter >
           <Main
             authorizationStatus={AuthorizationStatus.NO_AUTH}
             avatarUrl=""
             movie={film}
             onMovieCardClick={testFunc}
             onMouseClick={testFunc}
             onMovieHover={testFunc}
             onFilmFavoriteStatusClick={testFunc}
           />
         </BrowserRouter >
       </Provider>)
   .toJSON();

  expect(tree).toMatchSnapshot();
});

