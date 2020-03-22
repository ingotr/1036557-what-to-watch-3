import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {reducer} from '../../reducer.js';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {FirstMovie, movies, movieInfo, film} from '../../mocks/test-mocks.js';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

it(`Render App`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <App
        title={FirstMovie.TITLE}
        genre={FirstMovie.GENRE}
        releaseDate={FirstMovie.RELEASE_DATE}
        movies={movies}
        film={film}
        movieInfo={movieInfo}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
