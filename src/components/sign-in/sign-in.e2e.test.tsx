import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SignIn from './sign-in';
import {BrowserRouter} from 'react-router-dom';

configure({
  adapter: new Adapter()
});

it(`Should call handler on button click`, () => {
  const submitButtonClickHandler = jest.fn();

  const signIn = mount(
      <BrowserRouter>
        <SignIn
          onHandleSubmit={submitButtonClickHandler}
          loginError={false}
          passwordError={false}
        />
      </BrowserRouter>
  );

  signIn.children().find(`form.sign-in__form`).simulate(`submit`);

  expect(submitButtonClickHandler.mock.calls.length).toBe(1);
});
