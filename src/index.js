import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {films, movieInfo} from './mocks/films.js';

const FilmDetails = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

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

