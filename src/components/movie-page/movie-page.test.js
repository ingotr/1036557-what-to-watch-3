import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';

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
   .create(<MoviePage
     movieInfo={movieInfo}
     title={movieInfo.title}
     genre={movieInfo.genre}
     poster={movieInfo.poster}
     rating={movieInfo.rating}
     director={movieInfo.director}
     description={movieInfo.description}
     starrring={movieInfo.starring}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
