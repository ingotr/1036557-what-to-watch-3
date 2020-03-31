import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in.jsx';
import {BrowserRouter} from 'react-router-dom';

it(`Should render SignIn component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SignIn
            onSubmit={() => {}}
            onHandleSubmit={() => {}}
            loginError={false}
            passwordError={false}
          />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
