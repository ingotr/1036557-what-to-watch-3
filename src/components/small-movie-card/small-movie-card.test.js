import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';

const Movie = {
  id: `mock-card-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  imgSrc: `img/bohemian-rhapsody.jpg`,
};

it(`Render App`, () => {
  const tree = renderer
   .create(<SmallMovieCard
     key={Movie.id}
     title={Movie.title}
     imgSrc={Movie.imgSrc}

     onMovieHover={() => {}}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
