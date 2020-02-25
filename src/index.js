import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import App from './components/app/app.jsx';
import {films, movieInfo} from './mocks/films.js';
import {reducer} from './reducer.js';

const FilmDetails = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const store = createStore(reducer);

ReactDOM.render(
    <App
      title={FilmDetails.TITLE}
      genre={FilmDetails.GENRE}
      releaseDate={FilmDetails.RELEASE_DATE}
      movies={films}
      movieInfo={movieInfo}
    />,
    document.querySelector(`#root`)
);

