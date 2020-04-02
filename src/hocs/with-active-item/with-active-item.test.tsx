import * as React from 'react';
import {configure, shallow} from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import withActiveItem from '../with-active-item/with-active-item';

const Movie = {
  id: `mock-snap-001`,
  title: `mock-test-Bohemian Rhapsody`,
  imgSrc: `img/bohemian-rhapsody.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change ActiveItem`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(``);

  wrapper.props().onItemEnter(Movie);
  expect(wrapper.state().activeItem).toEqual(Movie);

  wrapper.props().onItemLeave(Movie);
  expect(wrapper.state().activeItem).toEqual(null);
});
