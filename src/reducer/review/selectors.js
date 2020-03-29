import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.REVIEW;


export const getText = (state) => {
  return state[NAME_SPACE].text;
};

export const getSendStatus = (state) => {
  return state[NAME_SPACE].sendStatusMessage;
};

export const getFormBlock = (state) => {
  return state[NAME_SPACE].formBlock;
};

export const getRating = (state) => {
  return state[NAME_SPACE].rating;
};
