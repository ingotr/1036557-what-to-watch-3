import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const FirstMovie = {
  TITLE: `First movie test title`,
  GENRE: `First movie test genre`,
  RELEASE_DATE: 2009,
};

const Movies = [
  {
    id: `mock-test-011`,
    title: `mock-test-Fantastic Beasts: The Crimes of Grindelwald`,
    imgSrc: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: `mock-test-012`,
    title: `mock-test-Bohemian Rhapsody`,
    imgSrc: `img/bohemian-rhapsody.jpg`,
  },
  {
    id: `mock-test-013`,
    title: `mock-test-Macbeth`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-test-014`,
    title: `mock-test-Aviator`,
    imgSrc: `img/aviator.jpg`,
  },
  {
    id: `mock-test-015`,
    title: `mock-test-We need to talk about Kevin`,
    imgSrc: `img/we-need-to-talk-about-kevin.jpg`,
  },
  {
    id: `mock-test-016`,
    title: `mock-test-What We Do in the Shadows`,
    imgSrc: `img/what-we-do-in-the-shadows.jpg`,
  },
  {
    id: `mock-test-017`,
    title: `mock-test-Revenant`,
    imgSrc: `img/revenant.jpg`,
  },
  {
    id: `mock-test-018`,
    title: `mock-test-Johnny English`,
    imgSrc: `img/johnny-english.jpg`,
  },
  {
    id: `mock-test-019`,
    title: `mock-test-Shutter Island`,
    imgSrc: `img/shutter-island.jpg`,
  },
  {
    id: `mock-test-020`,
    title: `mock-test-Pulp Fiction`,
    imgSrc: `img/pulp-fiction.jpg`,
  },
  {
    id: `mock-test-021`,
    title: `mock-test-No Country for Old Men`,
    imgSrc: `img/no-country-for-old-men.jpg`,
  },
  {
    id: `mock-test-022`,
    title: `mock-test-Snatch`,
    imgSrc: `img/snatch.jpg`,
  },
  {
    id: `mock-test-023`,
    title: `mock-test-Moonrise Kingdom`,
    imgSrc: `img/moonrise-kingdom.jpg`,
  },
  {
    id: `mock-test-024`,
    title: `mock-test-Seven Years in Tibet`,
    imgSrc: `img/seven-years-in-tibet.jpg`,
  },
  {
    id: `mock-test-025`,
    title: `mock-test-Midnight Special`,
    imgSrc: `img/midnight-special.jpg`,
  },
  {
    id: `mock-test-026`,
    title: `mock-test-War of the Worlds`,
    imgSrc: `img/war-of-the-worlds.jpg`,
  },
  {
    id: `mock-test-027`,
    title: `mock-test-Dardjeeling Limited`,
    imgSrc: `img/dardjeeling-limited.jpg`,
  },
  {
    id: `mock-test-028`,
    title: `mock-test-Orlando`,
    imgSrc: `img/orlando.jpg`,
  },
  {
    id: `mock-test-`,
    title: `mock-test-Mindhunter`,
    imgSrc: `img/mindhunter.jpg`,
  },
  {
    id: `mock-test-030`,
    title: `mock-test-Midnight Special`,
    imgSrc: `img/midnight-special.jpg`,
  },
];

const movieInfo = {
  title: `Mock-test--The Grand Budapest Hotel`,
  genre: `Mock-test--Drama`,
  year: 2018,
  poster: {
    big: `img/the-grand-budapest-hotel-poster.jpg`,
    bigAlt: `Mock-test--The Grand Budapest Hotel poster`,
  },
  rating: {
    score: 7.3,
    level: `Mock-test--Very good`,
    count: 1341,
  },
  director: `Mock-test--Wes Andreson`,
  description: [`Mock-test--In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave &#96s friend and protege.`,
    `Mock-test--Gustave prides himself on providing first-className service to the hotel &#96s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave &#96s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`],
  starring: [`Mock-test--Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};


it(`Render App`, () => {
  const tree = renderer
   .create(<App
     title={FirstMovie.TITLE}
     genre={FirstMovie.GENRE}
     releaseDate={FirstMovie.RELEASE_DATE}
     movies={Movies}
     movieInfo={movieInfo}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
