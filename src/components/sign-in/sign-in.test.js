import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';

it(`Should render SignIn component`, () => {
  const tree = renderer
    .create(
        <SignIn
          onSubmit={() => {}}
          onHandleSubmit={() => {}}
          loginError={false}
          passwordError={false}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
