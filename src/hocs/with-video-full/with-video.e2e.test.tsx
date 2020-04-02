import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withVideo from './with-video-full';
import {film} from '../../mocks/test-mocks';
import {testFunc} from '../../utils';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`Should change isPlaying`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        movie={film}
        onItemLeave={testFunc}
      />, {disableLifecycleMethods: true});

  const {_videoRef} = wrapper.instance();

  _videoRef.current = {
    play: testFunc,
    src: ``,
    pause: testFunc
  };

  wrapper.instance().componentDidMount();

  wrapper.instance().handlePlayClick();
  expect(wrapper.state().isPlaying).toEqual(true);

  wrapper.instance().handlePlayClick();
  expect(wrapper.state().isPlaying).toEqual(false);
});
