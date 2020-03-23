import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from './small-movie-card.jsx';

const Movie = {
  id: `mock-card-snap-001`,
  name: `mock-test-Bohemian Rhapsody`,
  image: `img/bohemian-rhapsody.jpg`,
  previewSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Render App`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          id={Movie.id}
          name={Movie.name}
          image={Movie.image}
          poster={Movie.image}
          previewSrc={Movie.previewSrc}
          onMovieHover={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
