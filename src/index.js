import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const FilmDetails = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
};

const movies = [
  {
    id: `test011`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    imgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: `test012`,
    title: `Bohemian Rhapsody`,
    imgSrc: `img/bohemian-rhapsody.jpg`,
  },
  {
    id: `test013`,
    title: `Macbeth`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `test014`,
    title: `Aviator`,
    imgSrc: `img/aviator.jpg`,
  },
  {
    id: `test015`,
    title: `We need to talk about Kevin`,
    imgSrc: `img/we-need-to-talk-about-kevin.jpg`,
  },
  {
    id: `test016`,
    title: `What We Do in the Shadows`,
    imgSrc: `img/what-we-do-in-the-shadows.jpg`,
  },
  {
    id: `test017`,
    title: `Revenant`,
    imgSrc: `img/revenant.jpg`,
  },
  {
    id: `test018`,
    title: `Johnny English`,
    imgSrc: `img/johnny-english.jpg`,
  },
  {
    id: `test019`,
    title: `Shutter Island`,
    imgSrc: `img/shutter-island.jpg`,
  },
  {
    id: `test020`,
    title: `Pulp Fiction`,
    imgSrc: `img/pulp-fiction.jpg`,
  },
  {
    id: `test021`,
    title: `No Country for Old Men`,
    imgSrc: `img/no-country-for-old-men.jpg`,
  },
  {
    id: `test022`,
    title: `Snatch`,
    imgSrc: `img/snatch.jpg`,
  },
  {
    id: `test023`,
    title: `Moonrise Kingdom`,
    imgSrc: `img/moonrise-kingdom.jpg`,
  },
  {
    id: `test024`,
    title: `Seven Years in Tibet`,
    imgSrc: `img/seven-years-in-tibet.jpg`,
  },
  {
    id: `test025`,
    title: `Midnight Special`,
    imgSrc: `img/midnight-special.jpg`,
  },
  {
    id: `test026`,
    title: `War of the Worlds`,
    imgSrc: `img/war-of-the-worlds.jpg`,
  },
  {
    id: `test027`,
    title: `Dardjeeling Limited`,
    imgSrc: `img/dardjeeling-limited.jpg`,
  },
  {
    id: `test028`,
    title: `Orlando`,
    imgSrc: `img/orlando.jpg`,
  },
  {
    id: `test029`,
    title: `Mindhunter`,
    imgSrc: `img/mindhunter.jpg`,
  },
  {
    id: `test030`,
    title: `Midnight Special`,
    imgSrc: `img/midnight-special.jpg`,
  },
];

ReactDOM.render(
    <App
      title={FilmDetails.TITLE}
      genre={FilmDetails.GENRE}
      releaseDate={FilmDetails.RELEASE_DATE}
      movies={movies}
    />,
    document.querySelector(`#root`)
);

