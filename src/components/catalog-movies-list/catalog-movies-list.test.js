import React from 'react';
import renderer from 'react-test-renderer';
import CatalogMoviesList from '../catalog-movies-list/catalog-movies-list.jsx';

const Movies = [
  {
    id: `mock-card-snap-001`,
    title: `mock-test-Bohemian Rhapsody`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-002`,
    title: `mock-test-Macbeth`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-003`,
    title: `mock-test-Aviator`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-004`,
    title: `mock-test-Revenant`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-005`,
    title: `mock-test-Johnny English`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-006`,
    title: `mock-test-Pulp Fiction`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-007`,
    title: `mock-test-Snatch`,
    imgSrc: `img/macbeth.jpg`,
  },
  {
    id: `mock-card-snap-008`,
    title: `mock-test-Moonrise Kingdom`,
    imgSrc: `img/macbeth.jpg`,
  },
];

it(`Render App`, () => {
  const tree = renderer
   .create(<CatalogMoviesList
     movies={Movies}
     onMovieHover={() => {}}
   />)
   .toJSON();

  expect(tree).toMatchSnapshot();
});
