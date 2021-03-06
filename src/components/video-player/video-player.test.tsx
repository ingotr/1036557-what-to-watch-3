import * as React from 'react';
import * as renderer from 'react-test-renderer';
import VideoPlayer from './video-player';

const Movie = {
  id: `mock-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  imgSrc: `img/bohemian-rhapsody.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`VideoPlayer is rendered correctly`, () => {
  const tree = renderer
   .create(<VideoPlayer
     key={Movie.id}
   >
     children=testIntance.children
   </VideoPlayer>, {
     createNodeMock: () => {
       return {};
     }
   }).toJSON();

  expect(tree).toMatchSnapshot();
});

