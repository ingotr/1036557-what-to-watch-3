import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SignIn from './sign-in';
import {BrowserRouter} from 'react-router-dom';
import testFunc from '../../utils';

it(`Should render SignIn component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SignIn
            onHandleSubmit={testFunc}
            loginError={false}
            passwordError={false}
          />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
