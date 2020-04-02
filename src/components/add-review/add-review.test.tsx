import * as React from 'react';
import * as renderer from 'react-test-renderer';
import AddReview from './add-review';
import {film} from '../../mocks/test-mocks';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../reducer/user/user';
import NameSpace from '../../reducer/name-space';
import testFunc from '../../utils';

const mockStore = configureStore([]);

it(`Render AddReview`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
      rating: 5,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus,
    }
  });

  const addReview = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <AddReview
              authorizationStatus={``}
              movieId={`1`}
              onSubmit={testFunc}
              movie={film}
              formBlock={true}
              updateNewCommentText={testFunc}
              textValue={``}
              sendStatusValue={``}
              changeSendStatusText={testFunc}
              rating={5}
              changeRating={testFunc}
            />
          </BrowserRouter>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(addReview).toMatchSnapshot();
});
