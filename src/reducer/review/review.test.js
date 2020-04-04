import {reducer, ActionType} from './review.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  });
});

it(`Reducer should change text`, () => {
  expect(reducer({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  }, {
    type: ActionType.UPDATE_NEW_COMMENT_TEXT,
    payload: `Comedies`,
  })).toEqual({
    text: `Comedies`,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  });
});

it(`Reducer should change sendStatusMessage`, () => {
  expect(reducer({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  }, {
    type: ActionType.CHNGE_SEND_STATUS_TEXT,
    payload: `Comedies`,
  })).toEqual({
    text: ``,
    sendStatusMessage: `Comedies`,
    formBlock: false,
    rating: 5,
  });
});

it(`Reducer should change formBlock`, () => {
  expect(reducer({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  }, {
    type: ActionType.CHANGE_BLOCK_FORM,
    payload: true,
  })).toEqual({
    text: ``,
    sendStatusMessage: ``,
    formBlock: true,
    rating: 5,
  });
});

it(`Reducer should change rating`, () => {
  expect(reducer({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 5,
  }, {
    type: ActionType.CHANGE_RATING,
    payload: 3,
  })).toEqual({
    text: ``,
    sendStatusMessage: ``,
    formBlock: false,
    rating: 3,
  });
});
